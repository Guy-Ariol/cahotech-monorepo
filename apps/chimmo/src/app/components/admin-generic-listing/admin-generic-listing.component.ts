import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../../../../../libs/service/src/lib/user/user.service';
import { adminView, homeEnum } from '../../services/interfaces/interfaces.service';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { DataService } from '../../services/data/data.service';
import { HomeService } from '../../services/home/home.service';

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
      return house.name
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
  deleteUser (userId) {
    this.utilsProv.startSpinner()

    this.userLib.deleteUser(userId)
      .then(() => {
        setTimeout(() => {
          this.utilsProv.showToast('success', 'Opération réussi', '', 'toast-top-center')
          this.refreshData()
        }, 1000);

      })
      .catch(error => {
        console.log(error)
      })
  }

  /** refresh input data */
  refreshData () {
    if ([adminView.landlord, adminView.renter].includes(this.currentView)) {
      this.displayList = this.userLib.allUsers.filter(user => { return user.apps && user.apps.includes(this.dataProv.appName) })
      this.blankMsg = `Il n'ya pas de ${this.currentView == adminView.landlord ? '' : ''} enrégistrer!`
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
}
