import { Component, OnInit } from '@angular/core';
import { eventType, EventService, tableEnum } from '../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

enum view { newEvent, eventList, none, table }

@Component({
  selector: 'cahotech-monorepo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isMenuOpen = true
  currentView: view = view.none
  view = view
  tableEnum = tableEnum

  mainMenu = [
    { title: 'New event', view: view.newEvent }, { title: 'All events', view: view.eventList }, { title: 'Table setup', view: view.table },
    { title: '...', view: view.table }
  ]
  newEvent = {} as eventType
  screen = 0
  index = 0

  showTableMenu = false


  constructor(
    private toast: MatSnackBar,
    public eventProv: EventService,
    private router: Router

  ) {
    this.screen = window.innerWidth

  }

  ngOnInit (): void {
    this.newEvent.room = 'Vida'
    this.newEvent.tableType = tableEnum.Banquet
    this.scrollTop()
  }

  toogleMenu () {
    this.isMenuOpen = !this.isMenuOpen
    this.scrollTop()
  }

  submit () {
    if (!this.newEvent.endDate || !this.newEvent.name || !this.newEvent.room || !this.newEvent.startDate || !this.newEvent.tableType) {
      this.toast.open('Vérifier les entrées', '',
        { verticalPosition: 'bottom', horizontalPosition: 'center', duration: 3000, panelClass: 'toast-error' })
    }
    else {
      let continuer = true

      while (continuer) {
        this.newEvent.id = this.randomId(6, false)
        continuer = false

        for (let event of this.eventProv.allEvents) {
          if (event.id == this.newEvent.id) {
            continuer = true
            break
          }
        }
      }

      this.eventProv.createEvent(this.newEvent)
        .then(() => {
          this.toast.open('Opération réussie', '',
            { verticalPosition: 'bottom', horizontalPosition: 'center', duration: 3000, panelClass: 'toast-success' })

          this.scrollTop()
          this.currentView = view.eventList
        })
        .catch(error => {
          console.log(error);
          this.toast.open('Un érreur est survenue.', '',
            { verticalPosition: 'bottom', horizontalPosition: 'center', duration: 3000, panelClass: 'toast-error' })
        })
    }

  }

  scrollTop () {
    window.scrollTo({ top: 1, behavior: 'smooth' })
  }

  /** generate random code
  *
  * @param {number} length
  * @param {boolean} [numericOnly=true]
  * @returns
  * @memberof UtilsService
  */
  randomId (length: number, numericOnly: boolean = true) {
    let result = '';
    let characters

    if (!numericOnly) characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    else characters = '0123456789'

    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  openDetails (event: eventType) {
    this.eventProv.currentEvent = event
    this.router.navigate(['event-details'], { queryParams: { event: event.id } })
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

  getMonotonList (number) {
    return [...Array(number).keys()]
  }

  selectPlace (table) {
    // console.log(table);
    this.eventProv.currentTableID = table

    this.showTableMenu = true
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
}
