import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { HomeService } from '../../services/home/home.service';
import { appView, repairEnum, repairType, requestType } from '../../services/interfaces/interfaces.service';
import { houseType, homeType, homeEnum, userEnum, userType } from '@cahotech-monorepo/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'cahotech-monorepo-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  currentView: appView
  view = appView
  userEnum = userEnum

  isNewRepair = ''
  isNewRequest = false

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

    for (let key in this.userLib?.currentUser?.rentersID) {
      if (key) {
        renter.push(this.userLib.allUsers.find(user => user.id == key))
      }
    }

    return renter
  }

  getHomeDetails (homesId): homeType[] {
    let homes = []

    if (homesId) homesId.forEach(homeId => {
      homes.push(this.homeProv.allHomes.find(home => home.id == homeId))
    })

    return homes
  }

  openDocList (home) {
    this.homeProv.currentHome = home
    this.currentView = this.view.document
    this.router.navigate(['/bailleur'], { queryParams: { view: this.view.document } })
  }

  getRepairType () {
    let out = []

    for (let type in repairEnum) {
      let val = repairEnum[type]
      if (val && !parseInt(val)) out.push(val)
    }

    return out
  }

  createNewRepair (data) {
    console.log(data, this.isNewRepair);
    console.log(this.homeProv.allHomes)


    let repair: repairType = {
      id: this.homeProv.createPushKey(),
      timeStamp: Date.now(),
      description: data.description,
      department: data.department,
      cost: 0,
      doc: null,
      status: 'warning'
    }

    let home = this.homeProv.allHomes.find(home => home.id == this.isNewRepair)
    if (home) {
      try {
        home.reparations.push(repair.id)
      } catch (error) {
        home.reparations = [repair.id]
      }

      this.homeProv.updateHome(home)
        .then(() => {
          this.homeProv.updateRepair(repair)
            .then(() => {
              this.isNewRepair = ''
            })
            .catch(error => {
              console.log(error);

            })
        })
        .catch(error => {
          console.log(error);

        })
    }
    else {
      console.log('home not found');

    }


  }

  getReparationDetails (reparationId) {
    let out = {} as repairType
    out = this.homeProv.allReparations.find(reparation => reparation.id == reparationId)

    return out
  }

  addNewRequest (desciption) {
    if (this.userLib.currentUser.id) {
      let req: requestType = {
        reporterId: this.userLib.currentUser.id,
        id: this.homeProv.createPushKey(),
        timeStamp: Date.now(),
        type: '',
        description: desciption,
        status: 'warning'
      }

      this.homeProv.addNewRequest(req)
        .then(() => this.isNewRequest = false)
        .catch(error => console.log(error))
    }
  }

  getAllCashIn (id) {
    try {
      return this.homeProv.getTransactionBySenderId(id).filter(item => item.sum > 0)
    } catch (error) {
      return []
    }
  }

  getAllCashOut (id) {
    try {
      return this.homeProv.getTransactionBySenderId(id).filter(item => item.sum < 0)
    } catch (error) {
      return []
    }
  }


}
