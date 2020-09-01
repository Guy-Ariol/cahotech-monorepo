import { Component, OnInit } from '@angular/core';

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
    {title: 'New event', view: view.newEvent}, {title: 'All events', view: view.eventList}
  ]

  constructor() { }

  ngOnInit (): void {
  }

  toogleMenu () {
    this.isMenuOpen = !this.isMenuOpen
    console.log('test');

  }
}
