import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from "@angular/router";
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { ta } from 'date-fns/locale';

enum action { seletTable, none, newGuest }

@Component({
  selector: 'cahotech-monorepo-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  screen

  index = 0
  currentAction = action.none
  action = action

  showTableMenu = false

  constructor(
    public eventProv: EventService,
    private routerParam: ActivatedRoute,
    private _bottomSheet: MatBottomSheet

  ) {
    this.screen = window.innerWidth
  }

  ngOnInit (): void {

    this.routerParam.queryParams.subscribe(params => {
      if (!this.eventProv.currentEvent.id) {
        console.log('reloading page');

        setTimeout(() => {
          this.eventProv.currentEvent = this.eventProv.allEvents.find(event => event.id == params.event)
          this.updateRoomPosition()
        }, 3000);
      }

    })

    // populate the room
    this.updateRoomPosition()

  }


  goback () {
    window.history.back()
  }

  getMonotonList (number) {
    return [...Array(number).keys()]
  }

  add (type) {
    if (this.screen > 400) {
      let r = document.getElementById('room').children

      for (let i = 0; i < r.length; i++) {
        let c = <HTMLElement>r.item(i).firstChild

        if (c.className == type) {
          // console.log(c);

          if (c.style.display == 'none') {
            if (type != 'C1') c.getElementsByClassName('stock-table1').item(0).innerHTML = this.index.toString()

            console.log();
            c.style.position = 'absolute'
            c.style.top = '15px'
            c.style.display = 'flex'

            this.index++
            break
          }
        }
      }

      document.getElementById('room').scrollTo({ top: 1, behavior: 'smooth' })
    }
    else {

    }
  }

  updateRoomPosition () {
    // console.log(this.eventProv.currentEvent.tablePosition);


    // console.log(this.room)
    let el: HTMLElement = document.createElement('div')
    el.innerHTML = this.eventProv.currentEvent?.tablePosition
    let children = el.children



    for (let i = 0; i < children.length; i++) {
      let fc = <HTMLElement>children.item(i).firstChild
      console.log(fc.id)

      let element = document.getElementById(fc.id)
      // console.log(element)


      if (element) {
        element.className = children.item(i).className
        element.innerText = children.item(i).innerHTML
        element.style.transform = children.item(i).getAttribute('style')?.replace('transform: ', '').replace(';', '')
      }
    }
  }

  addNewGuest (name) {
    this.eventProv.selectedGuest = name

    try {
      this.eventProv.currentEvent.guests.push({ name: name, seat: { table: '', place: '' } })
    } catch (error) {
      this.eventProv.currentEvent.guests = [{ name: name, seat: { table: '', place: '' } }]
    }

    this.currentAction = action.seletTable
  }

  selectPlace (table) {
    console.log(table);
    this.eventProv.currentTableID = table

    if (this.eventProv.selectedGuest) {
      let temp = this.eventProv.currentEvent.guests.find(guest => guest.name == this.eventProv.selectedGuest)
      temp.seat.table = table

      // if list exits
      if (this.eventProv.currentEvent.seats) {

        // table id already rgistered, do nothing
        if (this.eventProv.currentEvent.seats.find(s => s.tableId == table)) {
          console.log('table found');

        }
        else {
          this.eventProv.currentEvent.seats.push({ tableId: table, place: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' } })

        }
      }
      else {
        console.log('seat list undef');
        this.eventProv.currentEvent.seats = [{ tableId: table, place: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' } }]

      }

      this._bottomSheet.open(BottomSheetSheet).afterDismissed().subscribe(data => {
        console.log(data);

        if (data) {
          let temp = this.eventProv.currentEvent.guests.find(guest => guest.name == this.eventProv.selectedGuest)
          temp.seat.place = data

          // reset selections, important by assigning guest to another place then before.
          let ct = this.eventProv.currentEvent.seats.find(seat => this.eventProv.getCurrentTable().tableId == seat.tableId)
          for (let el in ct.place) {
            if (ct.place[el] == this.eventProv.selectedGuest) ct.place[el] = ''
          }

          this.eventProv.currentEvent.seats.find(seat => this.eventProv.getCurrentTable().tableId == seat.tableId).place[data] = this.eventProv.selectedGuest

          this.eventProv.selectedGuest = ''
          this.currentAction = action.none
        }
      })
    }
    else {
      this.showTableMenu = true
    }

    // console.log(this.eventProv.currentEvent)

  }

  selectGuest (name) {
    this.currentAction = action.seletTable
    this.eventProv.selectedGuest = name
  }

  rotateTable () {
    // console.log(this.eventProv.currentTableID)
    let r = document.getElementById('room').children
    // console.log(r);

    if (this.eventProv.rotationAngle == 'rotate(0deg)') this.eventProv.rotationAngle = 'rotate(45deg)'
    else if (this.eventProv.rotationAngle == 'rotate(45deg)') this.eventProv.rotationAngle = 'rotate(90deg)'
    else if (this.eventProv.rotationAngle == 'rotate(90deg)') this.eventProv.rotationAngle = 'rotate(135deg)'
    else if (this.eventProv.rotationAngle == 'rotate(135deg)') this.eventProv.rotationAngle = 'rotate(180deg)'
    else if (this.eventProv.rotationAngle == 'rotate(180deg)') this.eventProv.rotationAngle = 'rotate(225deg)'
    else if (this.eventProv.rotationAngle == 'rotate(225deg)') this.eventProv.rotationAngle = 'rotate(270deg)'
    else if (this.eventProv.rotationAngle == 'rotate(270deg)') this.eventProv.rotationAngle = 'rotate(0deg)'


    for (let i = 0; i < r.length; i++) {

      if (r.item(i).getElementsByClassName('stock-table1').item(0)?.innerHTML == this.eventProv.currentTableID) {

        let c = <HTMLElement>r.item(i).firstChild
        c.style.transform = this.eventProv.rotationAngle
      }
    }

  }

  deleteTable () {
    let r = document.getElementById('room').children

    for (let i = 0; i < r.length; i++) {
      let c = <HTMLElement>r.item(i).firstChild

      if (c.getElementsByClassName('stock-table1').item(0).innerHTML == this.eventProv.currentTableID) {
        c.style.display = 'none'
        break
      }
    }
  }

  saveConfig () {
    console.log('test');

    this.eventProv.currentEvent.tablePosition = (document.getElementById('room').innerHTML)
    this.eventProv.updateCurrentEvent()

  }
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetSheet {

  tableBooking

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetSheet>,
    private eventProv: EventService

  ) {
    this.tableBooking = this.eventProv.getCurrentTable()?.place
    console.log(this.tableBooking);

  }

  openLink (event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  Done (place) {

    if (this.tableBooking[place] && this.tableBooking[place] != this.eventProv.selectedGuest) {

    }
    else {
      this._bottomSheetRef.dismiss(place);
    }

  }
}
