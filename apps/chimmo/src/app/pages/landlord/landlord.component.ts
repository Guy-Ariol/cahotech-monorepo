import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { HomeService } from '../../services/home/home.service';
import { landLordView } from '../../services/interfaces/interfaces.service';

@Component({
  selector: 'cahotech-monorepo-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  currentView
  view = landLordView

  constructor(
    public utilsProv: UtilsService,
    public dataprov: DataService,
    public userLib: UserService,
    public homeProv: HomeService
  ) { }

  ngOnInit(): void {
  }

  // ariol@napata.tech
  topMenuSelected (menu) {
    this.currentView = menu

    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }

  toogleMenu () {
    this.currentView = landLordView.none


  }

  getLandLord (landlordId) {
    return this.userLib.allUsers.find(user => user.id == landlordId)
  }

  getHomeDetails () {
    for (let key in this.userLib.currentUser?.homes) {
      if (key) {
        return this.homeProv.allHomes.find(home => home.id == key)
      }
    }

  }

}
