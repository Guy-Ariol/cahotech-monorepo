import { Component } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'event-planner';

  constructor(
    public platform: Platform
  ){

  }
}
