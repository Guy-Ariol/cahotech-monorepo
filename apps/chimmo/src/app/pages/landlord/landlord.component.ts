import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { HomeService } from '../../services/home/home.service';
import { landLordView } from '../../services/interfaces/interfaces.service';
import { houseType, homeType, homeEnum, userEnum } from '@cahotech-monorepo/interfaces';

@Component({
  selector: 'cahotech-monorepo-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  currentView
  view = landLordView
  userEnum = userEnum

  constructor(
    public utilsProv: UtilsService,
    public dataprov: DataService,
    public userLib: UserService,
    public homeProv: HomeService
  ) { }

  ngOnInit (): void {
  }

  topMenuSelected (menu) {
    this.currentView = menu
    this.scrollToTop()
  }

  toogleMenu () {
    this.currentView = landLordView.none
    this.scrollToTop()
  }

  getLandLord (landlordId) {
    return this.userLib.allUsers.find(user => user.id == landlordId)
  }

  getHomeDetails (house: houseType): homeType[] {
    let homes = []

    for (let key of house?.homeList) {
      if (key) {
        homes.push(this.homeProv.allHomes.find(home => home.id == key))
      }
    }

    return homes
  }

  getHouseDetails (): houseType[] {
    let houses = []

    for (let key of this.userLib.currentUser?.housesID) {
      if (key) {
        houses.push(this.homeProv.allHouses.find(house => house.id == key))
      }
    }

    return houses
  }

  getHomeTypeString (typeEnum) {
    return homeEnum[typeEnum]
  }

  scrollToTop(){
    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }
}
