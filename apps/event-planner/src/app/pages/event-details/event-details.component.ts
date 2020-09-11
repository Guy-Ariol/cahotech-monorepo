import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'cahotech-monorepo-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  screen
  isStockOpen = true

  index = 0

  constructor(
    private eventProv: EventService,
    private routerParam: ActivatedRoute,

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
        }, 2000);
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
    // console.log(type);

    let r = document.getElementById('room').children
    // console.log(r);


    for (let i = 0; i < r.length; i++) {
      let c = <HTMLElement>r.item(i).firstChild
      // console.log(c.className);


      if (c.className == type) {
        // console.log(c);

        if (c.style.display == 'none') {
          if (type != 'C1') c.getElementsByClassName('stock-table1').item(0).innerHTML = this.index.toString()

          console.log();
          c.style.position = 'absolute'
          c.style.top = '0px'
          c.style.display = 'flex'
          console.log(c);

          this.index++
          break
        }
      }

    }

    document.getElementById('room').scrollTo({top: 1, behavior: 'smooth'})


    // let el = document.getElementById(this.index)
    // // console.log(el);

    // el.className = "table"
    // el.innerText = this.index



    // let r = document.getElementById('room')
    // // console.log(r.innerHTML);

    // this.eventProv.currentEvent.tablePosition = r.innerHTML

    // let source = document.getElementById('t1')
    // let copy = <HTMLElement>source.cloneNode(true)
    // let destination = document.getElementById('room')

    // console.log(source);
    // console.log(copy);
    // copy.id = this.index


    // destination.append(copy)

    // console.log(destination);

    // setTimeout(() => {
    //   this.zone.run(() => {
    //     // copy.setAttribute('cdkDrag', '')
    //   })
    // }, 500);


    // this.index = (parseInt(this.index) + 1).toString()
  }

  updateRoomPosition () {
    // console.log(this.eventProv.currentEvent);


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
