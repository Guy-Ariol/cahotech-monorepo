import { Component, HostListener } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UserService } from 'libs/service/src/lib/user/user.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chimmo';

  constructor(
    public utilsProv: UtilsService,
    private userLib: UserService

  ) {

  }

  ngOnInit () {
    this.utilsProv.startSpinner()

    setTimeout(() => {
      this.utilsProv.stopSpinner()
    }, 1000);

    this.utilsProv.setScreenSize(window.innerWidth, window.innerHeight)

    this.userLib.subscribeAllUser()
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utilsProv.setScreenSize(window.innerWidth, window.innerHeight)
  }


}
