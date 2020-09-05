import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'cahotech-monorepo-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  screen

  constructor(
    private zone: NgZone,

  ) {
    this.screen = window.innerWidth
  }

  ngOnInit (): void {
  }


  goback () {
    window.history.back()
  }

  addTable () {
    // let orig = document.getElementById("temp");
    // console.log(orig);
    // let element  = orig.cloneNode(true)

    // // element['id'] = 'aweraesr'
    // // element['style.transform'] = 'translate3d(72px, 215px, 0px)'

    // console.log(element);
    // let target = document.getElementById("target")
    // target.append(element)

    let orig = document.getElementById('temp')
    let target = document.getElementById('td1')

    target.append(orig)

  }

  myFunction () {
  //   var element = document.getElementById("myDIV");

  //   let New = document.createElement('div')
  //   New.innerHTML = '<p class="example-box" >hello</p>'

  //   element.append(New)
  //   element.classList.add("example-box");
  }
}
