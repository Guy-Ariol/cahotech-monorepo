import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  error = false;

  constructor(
    private userProv: UserService
  ) {

  }
  ngOnInit () {
    if (screen.width > 600) this.error = true
    else this.error = false

    this.userProv.getCurrentUser()
    this.userProv.subscribeAllUsers()
  }
}
