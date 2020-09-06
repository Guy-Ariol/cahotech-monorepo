import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { HomeService } from '../../services/home/home.service';
import { appView } from '../../services/interfaces/interfaces.service';
import { houseType, homeType, homeEnum, userEnum, userType } from '@cahotech-monorepo/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cahotech-monorepo-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  currentView: appView
  view = appView
  userEnum = userEnum

  constructor(
    public utilsProv: UtilsService,
    public dataprov: DataService,
    public userLib: UserService,
    public homeProv: HomeService,
    private route: ActivatedRoute,
    private router: Router

  ) {

    // setting the right context. Especially usefull when browsing back
    this.route.queryParams.subscribe(params => {
      this.currentView = params.view
      this.scrollToTop()
    })
  }


  ngOnInit (): void {
  }

  topMenuSelected (menu) {
    if (menu != this.view.none) {
      this.currentView = menu
      this.router.navigate(['/bailleur'], { queryParams: { view: menu } })
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

  getHomesFromHouse (house: houseType): homeType[] {
    let homes = []

    house?.homeList.forEach(key => {
      if (key) {
        homes.push(this.homeProv.allHomes.find(home => home.id == key))
      }
    })

    return homes
  }

  getHouseDetails (): houseType[] {
    let houses = []

    this.userLib?.currentUser?.housesID.forEach(key => {
      if (key) {
        houses.push(this.homeProv.allHouses.find(house => house.id == key))
      }
    })

    return houses
  }

  getHomeTypeString (typeEnum) {
    return homeEnum[typeEnum]
  }

  scrollToTop () {
    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }

  getRenterDetails (): userType[] {
    let renter = []

    this.userLib?.currentUser?.rentersID.forEach(key => {
      if (key) {
        renter.push(this.userLib.allUsers.find(user => user.id == key))
      }
    })

    return renter
  }

  getHomeDetails (homesId): homeType[] {
    let homes = []

    if (homesId) homesId.forEach(homeId => {
      homes.push(this.homeProv.allHomes.find(home => home.id == homeId))
    })

    return homes
  }
}
