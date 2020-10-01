import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { appView } from '../../services/interfaces/interfaces.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { HomeService } from '../../services/home/home.service';
import { userEnum } from 'libs/interfaces/src/lib/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'cahotech-monorepo-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.scss']
})
export class RenterComponent implements OnInit {

  currentView
  view = appView
  userEnum = userEnum

  constructor(
    public utilsProv: UtilsService,
    public dataprov: DataService,
    public userLib: UserService,
    public homeProv: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    public userProv: UsersService

  ) {

    // setting the right context. Especially usefull when browsing back
    this.route.queryParams.subscribe(params => {
      this.currentView = parseInt(params.view)
      this.scrollToTop()
    })
  }

  ngOnInit (): void {

  }

  scrollToTop () {
    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }

  // ariol@napata.tech
  topMenuSelected (menu) {
    // this.currentView = menu

    // setTimeout(() => {
    //   window.scrollTo({ top: 1, behavior: 'smooth' })
    // }, 100);

    if (menu != this.view.none) {
      this.currentView = menu
      this.router.navigate(['/locataire'], { queryParams: { view: menu } })
      this.scrollToTop()
    }
  }

  toogleMenu (view) {
    if (!view) this.currentView = this.view.mainMenuClosed
    else this.currentView = this.view.none
    this.scrollToTop()
  }

  getLandLord (landlordId) {
    return this.userLib.allUsers.find(user => user.id == landlordId)
  }

  getHomeDetails () {
    for (let key in this.userLib.currentUser.homesID) {
      if (key) {
        return this.homeProv.allHomes.find(home => home.id == key)
      }
    }

  }

  openDocList(){

  }
}
