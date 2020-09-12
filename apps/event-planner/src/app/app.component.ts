import { Component } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
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
    private utils: UtilsService

  ) {

  }

  ngOnInit () {
    this.utils.startSpinner()
    this.eventProv.subscribeEvents()

    setTimeout(() => {
      this.utils.stopSpinner()
    }, 2000);
  }
}
