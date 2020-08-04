import { Component, OnInit } from '@angular/core';
import { adminView } from '../../services/interfaces/interfaces.service';
import { DataService } from '../../services/data/data.service';
import { UsersService } from '../../services/users/users.service';
import { UtilsService } from "../../../../../../libs/service/src/lib/utils/utils.service";
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'cahotech-monorepo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentView = adminView.none
  view = adminView
  currentTitle = 'Selectioner un menu'

  controlArray: Array<{ title: string, value: any, type: string, index: number, list?: Array<any>, id: string }> = [];
  showTopMenu = false
  isNew = false
  isEdit = false
  currentUserIndex: number

  constructor(
    public dataprov: DataService,
    public userProv: UsersService,
    public utilsProv: UtilsService,
    private homeProv: HomeService
  ) { }

  ngOnInit (): void {
    this.homeProv.subscribeAllHouses()
    this.homeProv.subscribeAllHomes()
  }


  topMenuSelected (menu) {
    this.controlArray = []
    this.toogleMenu()
    this.currentView = menu

    if (menu == this.view.landlord) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Gestion bailleurs' }
    else if (menu == this.view.renter) { this.controlArray = this.dataprov.newRenterForm; this.currentTitle = 'Gestion locataires' }
    else if (menu == this.view.house) { this.controlArray = this.dataprov.newHouse; this.currentTitle = 'Gestion résidences' }
    else if (menu == this.view.home) { this.controlArray = this.dataprov.newHome; this.currentTitle = 'Gestion logements' }
    else if (menu == this.view.MoneyIn) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Caisse bailleur' }
    else if (menu == this.view.MoneyIn2) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Caisse locataire' }
  }

  /** */
  toogleMenu () {
    this.currentView = adminView.none
    this.isNew = false
    this.isEdit = false

    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }

  /** */
  editUser (data) {
    this.currentUserIndex = data.index

    this.isNew = false
    this.isEdit = true

    if ([this.view.landlord, this.view.renter].includes(this.currentView)) {
      this.controlArray[0].value = data.user.lastName
      this.controlArray[1].value = data.user.firstName
      this.controlArray[2].value = data.user.addres
      this.controlArray[3].value = data.user.email
      this.controlArray[4].value = data.user.tel
    }
  }

  /** */
  getTimeStamp (index, date) {
    let date1 = new Date(date[0])
    let date2 = new Date(date[1])

    this.controlArray[index].value = [date1.getTime(), date2.getTime()]
  }

}
