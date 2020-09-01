import { Component } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'event-planner';

  constructor(
    private eventProv: EventService,

  ) {

  }

  ngOnInit () {
    this.eventProv.subscribeEvents()

  }
}
