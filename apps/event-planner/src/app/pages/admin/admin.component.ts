import { Component, OnInit } from '@angular/core';
import { eventType } from '../../services/event.service';

enum view { newEvent, eventList, none }

@Component({
  selector: 'cahotech-monorepo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isMenuOpen = true
  currentView: view = view.none
  view = view

  mainMenu = [
    { title: 'New event', view: view.newEvent }, { title: 'All events', view: view.eventList }
  ]
  newEvent = {} as eventType
  screen = 0

  constructor(

  ) {
    this.screen = window.innerWidth
  }

  ngOnInit (): void {

    this.newEvent.room = 'Vida'
  }

  toogleMenu () {
    this.isMenuOpen = !this.isMenuOpen
    window.scrollTo({top: 1, behavior: 'smooth'})
  }

  submit () {
    if(!this.newEvent.endDate || !this.newEvent.name || this.newEvent.room || !this.newEvent.startDate || this.newEvent.tableType){

    }

  }

  test (ar) {
    console.log(ar);

  }
}
