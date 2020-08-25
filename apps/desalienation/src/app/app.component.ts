import { Component } from '@angular/core';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  error = false;

  ngOnInit () {
    if (screen.width > 400) this.error = true
    else this.error = false
  }
}
