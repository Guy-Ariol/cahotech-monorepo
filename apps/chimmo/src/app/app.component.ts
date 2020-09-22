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
  debouncing = false
  timeout = 4000

  constructor(
    public utilsProv: UtilsService,
    private userLib: UserService,
    @Inject(EventEmitter) private event: EventEmitter,
    private router: Router,
    private zone: NgZone,
    private homeProv: HomeService,


  ) {
    this.router.events.subscribe(ev => {
      if (!this.debouncing) {
        this.debouncing = true
        if (ev['url'].includes('11')) {
          // this.header._toogleMenu()
        }
      }

      setTimeout(() => {
        this.debouncing = false
      }, 2000);

    })
  }

  ngOnInit () {
    this.utilsProv.startSpinner()
    this.utilsProv.setScreenSize(window.innerWidth, window.innerHeight)

    let savedUser = localStorage.getItem('chimmo-user')

    // App subscriptions
    this.userLib.onAuthChanged()
    this.onLoginChanged()

    this.userLib.subscribeAllUser()
    this.homeProv.subscribeAllHomes()
    this.homeProv.subscribeAllHouses()
    this.homeProv.subscribeReparations()
    this.homeProv.subscribeRequests()

    //TODO changed to 4s instead of 1s
    setTimeout(() => {
      this.utilsProv.stopSpinner()
    }, 4000);

    setTimeout(() => {
      if (savedUser) {
        this.userLib.currentUser = this.userLib.allUsers.find(user => user.id = savedUser)
        this.timeout = 1000
        this.event.emit('logged in', savedUser)
      }
    }, 1500);
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
      localStorage.setItem('chimmo-user', this.userLib.currentUser.id)
      this.utilsProv.startSpinner()

      setTimeout(() => {
        let currentRouteParam = parseInt(this.router.url.split('view=')[1])

        let restore = false
        if (currentRouteParam || currentRouteParam == 0) restore = true

        if (this.router.url.includes('admin')) {
          console.log('test');

        }

        else if (this.userLib.currentUser.type == userEnum.admin) {
          this.zone.run(() => {
            this.router.navigate(['/admin'], { queryParams: { view: restore ? currentRouteParam : 11 } })
          })
        }

        else if (this.userLib.currentUser.type == userEnum.landlord) {
          this.zone.run(() => {
            this.router.navigate(['/bailleur'], { queryParams: { view: restore ? currentRouteParam : 11 } })
          })
        }

        else if (this.userLib.currentUser.type == userEnum.renter) {
          this.zone.run(() => {
            this.router.navigate(['/locataire'], { queryParams: { view: restore ? currentRouteParam : 11 } })
          })
        }

        else if (this.userLib.currentUser.type == userEnum.superAdmin) {
          this.router.navigate(['/super-admin'])
        }

        this.utilsProv.stopSpinner()
      }, this.timeout);
    })

    this.event.on('logged out', (results) => {
      console.log('log out');

      if (results) this.zone.run(() => {
        this.router.navigate(['/home'])
      })
    })
  }


}
