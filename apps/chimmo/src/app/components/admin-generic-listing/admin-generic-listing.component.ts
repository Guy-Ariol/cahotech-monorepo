import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../../../../../libs/service/src/lib/user/user.service';
import { appView } from '../../services/interfaces/interfaces.service';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { HomeService } from '../../services/home/home.service';
import { userType, userEnum, homeEnum, houseType, homeType } from '@cahotech-monorepo/interfaces';

@Component({
  selector: 'admin-generic-listing',
  templateUrl: './admin-generic-listing.component.html',
  styleUrls: ['./admin-generic-listing.component.scss']
})
export class AdminGenericListingComponent implements OnInit {

  @Output() showForm = new EventEmitter()
  @Output() editUser = new EventEmitter()
  @Input() currentView
  @Output() add = new EventEmitter()

  view = appView
  displayList = []
  blankMsg = ""

  homeEnum: homeEnum

  constructor(
    public userLib: UserService,
    public utilsProv: UtilsService,
    private dataProv: DataService,
    private homeProv: HomeService

  ) { }

  ngOnInit (): void {
    this.refreshData()
  }


  search (text) {
    if ([this.view.landlord, this.view.renter].includes(this.currentView)) {
      if (!text) this.displayList = this.userLib.allUsers.filter(user => { return user.apps && user.apps.includes(this.dataProv.appName) })
      else this.displayList = this.userLib.allUsers.filter(user => {
        return (user.firstName?.toLowerCase().includes(text) || user.lastName?.toLowerCase().includes(text)) && (user.apps && user.apps.includes(this.dataProv.appName))
      })
    }
  }

  getHomeType (arg) {
    return homeEnum[arg]
  }

  /** get house's name from house id*/
  getHouseName (houseid) {
    if (houseid) {
      const house = this.homeProv.allHouses.find(house => house.id == houseid)
      return house?.name
    }
  }

  /** get house's details from house id*/
  getHouseDetails (houseid) {
    if (houseid) {
      const house = this.homeProv.allHouses.find(house => house.id == houseid)
      return house?.name + ' / ' + house?.address
    }
  }

  /** get user's name from user's id*/
  getUserDetails (userId) {
    if (userId) {
      const user = this.userLib.allUsers.find(house => house.id == userId)
      return user.lastName + ' ' + user.firstName + ' / ' + user.email + ' / ' + user.tel
    }
  }

  getHomeList (house: houseType) {
    let out: homeType[] = []

    house.homeList?.forEach(homeId => {
      out.push(this.homeProv.allHomes.find(home => home.id == homeId))
    })

    return out
  }


  getlandLordName (id) {
    if (id) {
      let out = this.userLib.allUsers.find(user => user.id == id)

      return `${out?.firstName} ${out?.lastName}`
    }

    return ''
  }


  getRenterList (landLord: userType) {
    let list: userType[] = []

    if (landLord.rentersID) {
      for (let renter of landLord.rentersID) {
        list.push(this.userLib.allUsers.find(user => user.id == renter))
      }
    }

    return list
  }

  getRelations (home: homeType) {
    let out: { bail: string, locat: string }[] = []

    for (let rel in home.landLord) {
      out.push({ bail: home.landLord[rel].Id, locat: home.landLord[rel].renterId })
    }

    return out
  }

  getUserDetails2 (userId) {
    let user = this.userLib.allUsers.find(user => user.id == userId)
    return user?.lastName ? user.lastName : '' + ' ' + user?.firstName ? user?.firstName : ''
  }

  getHomeDetails (homeObject) {
    for (let homeId in homeObject) {
      let home = this.homeProv.allHomes.find(home => home.id == homeId)
      let house = this.homeProv.allHouses.find(house => house.id == home?.houseId)

      return { home: home, house: house }
    }
  }

  //TODO also delete user in firebase authenfication
  deleteUser (user: userType) {
    this.utilsProv.startSpinner()

    // also delete renter's reference in landlord
    if (this.currentView == this.view.renter) {
      const landLord = this.userLib.allUsers.find(el => el.id == user.id)

      try {
        landLord.rentersID.splice(landLord.rentersID.indexOf(user.id), 1)
      } catch (error) {

      }

      this.userLib.updateUser(landLord)
        .then(() => {
          this.userLib.deleteUser(user.id)
            .then(() => {
              setTimeout(() => {
                this.refreshData()
                this.utilsProv.stopSpinner()
                this.utilsProv.showToast('info', 'Opération réussi', '', 'toast-top-center')

              }, 1000);

            })
            .catch(error => {
              console.log(error)
              this.utilsProv.stopSpinner()
            })
        })
        .catch(error => {
          console.log(error);
          this.utilsProv.stopSpinner()
        })
    }
    else if (this.currentView == this.view.landlord) {
      this.userLib.deleteUser(user.id)
        .then(() => {
          setTimeout(() => {
            this.refreshData()
            this.utilsProv.stopSpinner()
            this.utilsProv.showToast('info', 'Opération réussi', '', 'toast-top-center')

          }, 1000);

        })
        .catch(error => {
          console.log(error)
          this.utilsProv.stopSpinner()
        })
    }
  }

  //TODO check that house does not have homes before deleting it

  deleteHouse (house: houseType) {
    this.utilsProv.startSpinner()

    if (house.homeList) {
      this.utilsProv.showToast('warning', "Veuillez d'abord supprimer les logements. ", '', 'toast-top-center')
      this.utilsProv.stopSpinner()
    }
    else {
      // remove reference by landlord
      let owner = this.userLib.allUsers.find(user => user.id == house.ownerId)

      if (owner.housesID) {
        owner.housesID.splice(owner.housesID.indexOf(house.id), 1)

        this.userLib.updateUser(owner)
          .then(() => {
            this.homeProv.deleteHouse(house.id)
              .then(() => {
                this.refreshData()
                this.utilsProv.stopSpinner()
                this.utilsProv.showToast('info', 'Opération réussie', '', 'toast-top-center')
              })
              .catch(error => {
                console.log(error);
                this.utilsProv.stopSpinner()
              })
          })
          .catch(error => {
            console.log(error);
            this.utilsProv.stopSpinner()
          })
      }

      // in case landlord having house was not found
      else {
        this.utilsProv.showToast('error', "Une érreur s'est produite", '', 'toast-top-center')
        this.utilsProv.stopSpinner()
      }
    }
  }


  deleteHome (home: homeType) {
    this.utilsProv.startSpinner()

    this.homeProv.deleteHome(home.id)
      .then(() => {
        // look for corresponding house
        let house = this.homeProv.allHouses.find(house => house.id == home.houseId)

        if (house.homeList) {
          // remove home reference in house
          house.homeList.splice(house.homeList.indexOf(home.id), 1)

          // update house in the server
          this.homeProv.updateHouse(house)
            .then(() => {
              this.refreshData()
              this.utilsProv.stopSpinner()
              this.utilsProv.showToast('info', 'Opération réussie', '', 'toast-top-center')
            })
        }
        else {
          // this.refreshData()
          this.utilsProv.stopSpinner()
          this.utilsProv.showToast('error', "Une érreur est survenue !", '', 'toast-top-center')
        }
      })
      .catch(error => {
        console.log(error);
        this.utilsProv.stopSpinner()
      })
  }

  /** refresh input data */
  refreshData () {
    if (this.currentView == this.view.landlord) {
      this.displayList = this.userLib.allUsers.filter(user => { return user.apps && user.apps.includes(this.dataProv.appName) })

      if (!this.displayList.filter(user => user.type == userEnum.landlord).length)
        this.blankMsg = `Il n'ya pas de bailleur enrégistrer!`
    }
    else if (this.currentView == this.view.renter) {
      this.displayList = this.userLib.allUsers.filter(user => { return user.apps && user.apps.includes(this.dataProv.appName) })

      if (!this.displayList.filter(user => user.type == userEnum.renter).length)
        this.blankMsg = `Il n'ya pas de locataire enrégistrer!`
    }
    else if (this.currentView == this.view.house) {
      this.displayList = this.homeProv.allHouses
      if (!this.displayList.length) this.blankMsg = `Il n'ya pas de résidences enrégistrer!`
    }
    else if (this.currentView == this.view.home) {
      this.displayList = this.homeProv.allHomes
      if (!this.displayList.length) this.blankMsg = `Il n'ya pas de logements enrégistrer!`
    }
  }

  getActionName(){
    if(this.currentView==this.view.landlord) return 'Locataire'
    if (this.currentView == this.view.house) return 'Logement'
  }

  getLastIndex(home: homeType, arg){
    if(home.consumption){
      return home.consumption[home.consumption.length -1][arg]
    }

    return 0
  }
}
