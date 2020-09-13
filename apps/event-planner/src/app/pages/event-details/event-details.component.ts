import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from "@angular/router";
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

enum action { seletTable, none, newGuest }

@Component({
  selector: 'cahotech-monorepo-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  screen

  currentAction = action.none
  action = action

  showTableMenu = false
  newGuestList: { name: string }[] = []

  isFirstEntry = true

  constructor(
    public eventProv: EventService,
    private routerParam: ActivatedRoute,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private utilsProv: UtilsService

  ) {
    this.screen = window.innerWidth
  }

  ngOnInit (): void {
    // this.room = localStorage.getItem('room')

    this.routerParam.queryParams.subscribe(params => {
      if (!this.eventProv.currentEvent.id) {
        console.log('reloading page');

        setTimeout(() => {
          this.eventProv.currentEvent = this.eventProv.allEvents.find(event => event.id == params.event)
          this.updateRoomPosition()
        }, 3000);
      }
    })

    if (this.isFirstEntry) {
      this.utilsProv.startSpinner()
      this.isFirstEntry = false

      setTimeout(() => {

        // populate the room
        this.updateRoomPosition()

        this.utilsProv.stopSpinner()
      }, 3000);
    }

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
            if (type != 'C1') c.getElementsByClassName('stock-table1').item(0).innerHTML = this.eventProv.index.toString()

            console.log();
            c.style.position = 'absolute'
            c.style.top = '15px'
            c.style.display = 'flex'

            this.eventProv.index++
            break
          }
        }
      }

      this.saveTableConfig()

      document.getElementById('room').scrollTo({ top: 1, behavior: 'smooth' })
    }
    else {

    }
  }

  updateRoomPosition () {
    // console.log('updateRoomPosition');

    if (this.eventProv.currentEvent?.id) {
      let el: HTMLElement = document.createElement('div')
      // el.innerHTML = this.room
      el.innerHTML = this.eventProv.currentEvent?.tablePosition || null

      if (el) {
        let children = el.children

        if (children) console.log('updateRoomPosition');

        for (let i = 0; i < children.length; i++) {
          let c = <HTMLElement>children.item(i)
          let text = c.getElementsByClassName('stock-table1').item(0)

          let element = document.getElementById(children.item(i).firstChild['id'])
          // console.log(c)


          if (element) {
            try {
              element.getElementsByClassName('stock-table1').item(0).innerHTML = text.innerHTML
            } catch (error) {

            }

            element.style.display = children.item(i).firstChild['style']['display']
            element.style.position = 'absolute'
            element.parentElement.style.transform = c.style.transform
          }
        }
      }
    }

    this.eventProv.index = this.eventProv.currentEvent.seats?.length | 0
    console.log(this.eventProv.index)

  }

  addNewGuest () {
    let error = ''
    let result = []

    this.newGuestList.forEach(nguest => {
      // ignore blank input.
      if (nguest.name) {
        // if name already in system prepare error message
        if (this.eventProv.currentEvent.guests?.find(guest => guest.name == nguest.name)) {
          error = error + ' ' + nguest.name
        }

        // else prepare validate input
        else {
          result.push(nguest.name)

          try {
            this.eventProv.currentEvent.guests.push({ name: nguest.name, seat: { table: '', place: '' } })
          } catch (error) {
            this.eventProv.currentEvent.guests = [{ name: nguest.name, seat: { table: '', place: '' } }]
          }
        }
      }
    })

    // in case only guest was registered start select table process
    if (result.length == 1) {
      this.eventProv.selectedGuest = result[0]
      this.showTableMenu = false
      this.currentAction = action.seletTable
    }
    else {
      this.currentAction = action.none
    }

    if (result.length) {
      this.eventProv.updateCurrentEvent()
      this.resetnewGuestForm()
    }

    // show errors if any
    if (error) {
      this._snackBar.open(`Nom existant: ${error}`, 'ok', {
        duration: 7000,
        horizontalPosition: 'left',
        verticalPosition: 'top',
        panelClass: 'toast-error'
      });
    }

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

          this.eventProv.updateCurrentEvent()
        }
      })
    }
    else {
      this.showTableMenu = true
    }
  }

  selectGuest (name) {
    this.showTableMenu = false

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

      if (c.getElementsByClassName('stock-table1').item(0)?.innerHTML == this.eventProv.currentTableID) {
        if (c.style.display != 'none') {
          console.log(c);

          c.style.display = 'none'
          this.eventProv.index--
          console.log(this.eventProv.index)

          this.saveTableConfig()

          break
        }
      }
    }
  }

  uploadTableConfig () {
    // if (this.eventProv.currentEvent.tablePosition != document.getElementById('room').innerHTML) {
    console.log('uploading actual table position');

    this.saveTableConfig()
    this.eventProv.updateCurrentEvent()
    // }
  }

  isBooked (tableId, chairId) {
    // console.log(tableId, chairId)

    let table = null

    try {
      table = this.eventProv.currentEvent.seats.find(seat => seat.tableId == tableId)

    } catch (error) {

    }

    if (table) return table.place[chairId]
    else return ''
  }

  saveTableConfig () {
    let pos = document.getElementById('room').innerHTML
    this.eventProv.currentEvent.tablePosition = pos
    // localStorage.setItem('room', pos)
  }

  appendNewGuestInput () {
    this.newGuestList.push({ name: '' })
    this.currentAction = action.newGuest

  }

  resetnewGuestForm () {
    this.newGuestList = []
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
