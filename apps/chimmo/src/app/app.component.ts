import { Component } from '@angular/core';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chimmo';

  constructor(
    public dataProv: DataService,

  ){

  }
}
