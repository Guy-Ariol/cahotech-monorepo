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
}
