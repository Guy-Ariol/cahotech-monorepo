import { Component, HostListener, NgZone, Inject } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { userEnum } from '@cahotech-monorepo/interfaces';
import { HomeService } from './services/home/home.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chimmo';

  constructor(
    public utilsProv: UtilsService,
    private userLib: UserService,
    @Inject(EventEmitter) private event: EventEmitter,
    private router: Router,
    private zone: NgZone,
    private homeProv: HomeService


  ) {

  }

  ngOnInit () {
    this.utilsProv.startSpinner()
    this.utilsProv.setScreenSize(window.innerWidth, window.innerHeight)

    // App subscriptions
    this.userLib.onAuthChanged()
    this.onLoginChanged()

    this.userLib.subscribeAllUser()
    this.homeProv.subscribeAllHomes()
    this.homeProv.subscribeAllHouses()


    //TODO changed to 3s instead of 1s
    setTimeout(() => {
      this.utilsProv.stopSpinner()
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utilsProv.setScreenSize(window.innerWidth, window.innerHeight)
  }

  /** go to home page when logged out and go the start page when logged in
    *
    * @memberof AppComponent
    */
  onLoginChanged () {
    this.event.on('logged in', userId => {
      this.userLib.subscribeUser(userId)

      setTimeout(() => {
        if (this.userLib.currentUser.type == userEnum.admin) {
          this.zone.run(() => {
            this.router.navigate(['/admin'])
          })
        }

        else if (this.userLib.currentUser.type == userEnum.landlord) {
          this.zone.run(() => {
            this.router.navigate(['/bailleur'])
          })
        }

        else if (this.userLib.currentUser.type == userEnum.renter) {
          this.zone.run(() => {
            this.router.navigate(['/locataire'])
          })
        }
      }, 3000);


    })

    this.event.on('logged out', () => {
      this.zone.run(() => {
        this.router.navigate(['/'])
      })
    })
  }


}
