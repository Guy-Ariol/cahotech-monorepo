import { Component, OnInit } from '@angular/core';
import { eventType, EventService, tableEnum } from '../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private toast: MatSnackBar,
    public eventProv: EventService,

  ) {
    this.screen = window.innerWidth
    console.log(this.screen);

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
}
