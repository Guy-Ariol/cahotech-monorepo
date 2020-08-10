import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { renterView } from '../../services/interfaces/interfaces.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'cahotech-monorepo-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.scss']
})
export class RenterComponent implements OnInit {

  currentView
  view = renterView

  constructor(
    public utilsProv: UtilsService,
    public dataprov: DataService,
    public userLib: UserService,
    public homeProv: HomeService

  ) { }

  ngOnInit (): void {
    setTimeout(() => {
      // this.userLib.currentUser = this.userLib.allUsers.find(u => u.id == '-MEOR-l1Syt96EDcdUnI')
    }, 2000);
  }

  // ariol@napata.tech
  topMenuSelected (menu) {
    this.currentView = menu

    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }

  toogleMenu () {
    // this.currentView = renterView.none


  }

  getLandLord (landlordId) {
    return this.userLib.allUsers.find(user => user.id == landlordId)
  }

  getHomeDetails () {
    for (let key in this.userLib.currentUser.homes) {
      if (key) {
        return this.homeProv.allHomes.find(home => home.id == key)
      }
    }

  }
}
