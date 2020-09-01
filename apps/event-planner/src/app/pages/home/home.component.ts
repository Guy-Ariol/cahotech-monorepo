import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cahotech-monorepo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventId = ''

  constructor(
    private router: Router,
    private eventProv: EventService,
    private toast: MatSnackBar,


  ) { }

  ngOnInit (): void {

  }


  getEvent () {
    if (this.eventId.toLowerCase() == 'admin') this.router.navigate(['admin'])
    else {
      let event = this.eventProv.allEvents.find(event => event.id == this.eventId)
      if (event) {
        this.eventProv.currentEvent = event
        this.router.navigate(['event-details'])
      }
      else {
        this.toast.open('Event not found', '',
          { verticalPosition: 'bottom', horizontalPosition: 'center', duration: 3000, panelClass: 'toast-error' })
      }
    }

  }


}
