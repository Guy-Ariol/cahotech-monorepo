import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../../../../../libs/service/src/lib/user/user.service';
import { adminView, homeEnum, houseType, homeType } from '../../services/interfaces/interfaces.service';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { HomeService } from '../../services/home/home.service';
import { userType } from '@cahotech-monorepo/interfaces';

@Component({
  selector: 'admin-generic-listing',
  templateUrl: './admin-generic-listing.component.html',
  styleUrls: ['./admin-generic-listing.component.scss']
})
export class AdminGenericListingComponent implements OnInit {

  @Output() showForm = new EventEmitter()
  @Output() editUser = new EventEmitter()
  @Input() currentView

  view = adminView
  displayList = []
  blankMsg = ""

  constructor(
    public userLib: UserService,
    public utilsProv: UtilsService,
    private dataProv: DataService,
    private homeProv: HomeService

  ) { }

  ngOnInit (): void {
    this.refreshData()
  }

  /** */
  search (text) {
    if ([adminView.landlord, adminView.renter].includes(this.currentView)) {
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

  /** */
  deleteUser (user: userType) {
    this.utilsProv.startSpinner()

    // also delete renter's reference in landlord
    if (this.currentView == adminView.renter) {
      const landLord = this.userLib.allUsers.find(el => el.id == user.id)
      delete landLord.renters[user.id]

      this.userLib.updateUser(landLord)
        .then(() => {
          this.userLib.deleteUser(user.id)
            .then(() => {
              setTimeout(() => {
                this.refreshData()
                this.utilsProv.stopSpinner()
                this.utilsProv.showToast('success', 'Opération réussi', '', 'toast-top-center')

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
    else if (this.currentView == adminView.landlord) {
      this.userLib.deleteUser(user.id)
        .then(() => {
          setTimeout(() => {
            this.refreshData()
            this.utilsProv.stopSpinner()
            this.utilsProv.showToast('success', 'Opération réussi', '', 'toast-top-center')

          }, 1000);

        })
        .catch(error => {
          console.log(error)
          this.utilsProv.stopSpinner()
        })
    }

  }

  //TODO check that house does not have homes before deleting it
  /** */
  deleteHouse (house: houseType) {
    this.utilsProv.startSpinner()

    if (house.homeList) {
      this.utilsProv.showToast('warning', "Veuillez d'abord supprimer les logements. ", '', 'toast-top-center')
    }
    else {
      // remove reference by landlord
      let owner = this.userLib.allUsers.find(user => user.id == house.ownerId)

      if (owner.houses) {
        owner.houses.splice(owner.houses.indexOf(house.id), 1)

        this.userLib.updateUser(owner)
          .then(() => {
            this.homeProv.deleteHouse(house.id)
              .then(() => {
                this.refreshData()
                this.utilsProv.stopSpinner()
                this.utilsProv.showToast('success', 'Opération réussie', '', 'toast-top-center')
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

  /** */
  deleteHome (home: homeType) {
    this.utilsProv.startSpinner()

    this.homeProv.deleteHome(home.id)
      .then(() => {
        // remove reference in house
        let house = this.homeProv.allHouses.find(house => house.id == home.houseId)
        if (house) {
          house.homeList.splice(house.homeList.indexOf(home.id), 1)
          this.homeProv.updateHouse(house)
            .then(() => {
              this.refreshData()
              this.utilsProv.stopSpinner()
              this.utilsProv.showToast('success', 'Opération réussie', '', 'toast-top-center')
            })
        }

        else {
          this.refreshData()
          this.utilsProv.stopSpinner()
          this.utilsProv.showToast('success', 'Opération réussie', '', 'toast-top-center')
        }
      })
      .catch(error => {
        console.log(error);
        this.utilsProv.stopSpinner()
      })
  }

  /** refresh input data */
  refreshData () {
    if ([adminView.landlord, adminView.renter].includes(this.currentView)) {
      this.displayList = this.userLib.allUsers.filter(user => { return user.apps && user.apps.includes(this.dataProv.appName) })
      this.blankMsg = `Il n'ya pas de ${this.currentView == adminView.landlord ? 'bailleur' : 'locataire'} enrégistrer!`
    }
    else if (this.currentView == adminView.house) {
      this.displayList = this.homeProv.allHouses
      this.blankMsg = `Il n'ya pas de résidences enrégistrer!`
    }
    else if (this.currentView == adminView.home) {
      this.displayList = this.homeProv.allHomes
      this.blankMsg = `Il n'ya pas de logements enrégistrer!`
    }
  }

  /** */
  getlandLordName (id) {
    if (id) {
      let out = this.userLib.allUsers.find(user => user.id == id)

      return `${out.firstName} ${out.lastName}`
    }

    return ''
  }

  /** */
  getRenterList (landLord: userType) {
    let list: userType[] = []

    if (landLord.renters) {
      for (let renter in landLord.renters) {
        list.push(this.userLib.allUsers.find(user => user.id == renter))
      }
    }

    return list
  }
}
