import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'cahotech-monorepo-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  screen
  isStockOpen = true

  index = '0'
  // room: any

  constructor(
    private eventProv: EventService

  ) {
    this.screen = window.innerWidth
  }

  ngOnInit (): void {
    // this.room = localStorage.getItem('room')

    setTimeout(() => {
      this.updateRoomPosition()
    }, 1000);
  }


  goback () {
    window.history.back()
  }

  getMonotonList (number) {
    return [...Array(number).keys()]
  }

  add (id) {
    let el = document.getElementById(this.index)
    // console.log(el);

    el.className = "table"
    el.innerText = this.index

    this.index = (parseInt(this.index) + 1).toString()

    let r = document.getElementById('room')
    // console.log(r.innerHTML);

     this.eventProv.currentEvent.tablePosition = r.innerHTML

  }

  updateRoomPosition () {
    // console.log(this.room)
    let el: HTMLElement = document.createElement('div')
    el.innerHTML = this.eventProv.currentEvent?.tablePosition
    let children = el.children


    for (let i = 0; i < children.length; i++) {

      let element = document.getElementById(children.item(i).id)

      if (element) {
        element.className = children.item(i).className
        element.innerText = children.item(i).innerHTML
        element.style.transform = children.item(i).getAttribute('style')?.replace('transform: ', '').replace(';', '')
      }
    }
  }


}
