import { Component, OnInit } from '@angular/core';
import { eventType } from '../../services/event.service';
import { FormControl } from '@angular/forms';

enum view { newEvent, eventList }

@Component({
  selector: 'cahotech-monorepo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isMenuOpen = true
  currentView: view = view.eventList
  view = view

  mainMenu = [
    { title: 'New event', view: view.newEvent }, { title: 'All events', view: view.eventList }
  ]
  newEvent = {} as eventType

  dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  selectedMoment = new Date()

  constructor() { }

  ngOnInit (): void {

  }

  toogleMenu () {
    this.isMenuOpen = !this.isMenuOpen
  }


}
