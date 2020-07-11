import { Component, OnInit, NgZone } from '@angular/core';
import { adminView } from '../../services/interfaces/interfaces.service';
import { userType, userEnum } from "@cahotech-monorepo/interfaces";
import { DataService } from '../../services/data/data.service';
import { UsersService } from '../../services/users/users.service';

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

  searchUsers: userType[] = []

  constructor(
    public dataprov: DataService,
    public userProv: UsersService,
    private ngZone: NgZone
  ) { }


  ngOnInit (): void {
    this.topMenuSelected(this.currentView)
    this.searchUsers = this.userProv.allusers
  }


  topMenuSelected (menu) {
    this.controlArray = []
    this.toogleMenu()
    this.currentView = menu

    if (menu == this.view.landlord) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Gestion bailleurs' }
    else if (menu == this.view.renter) { this.controlArray = this.dataprov.newRenterForm; this.currentTitle = 'Gestion locataires' }
    else if (menu == this.view.houses) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Gestion résidences' }
    else if (menu == this.view.home) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Gestion logements' }
    else if (menu == this.view.MoneyIn) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Caisse bailleur' }
    else if (menu == this.view.MoneyIn2) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Caisse locataire' }
  }


  toogleMenu () {
    this.showTopMenu = !this.showTopMenu
    window.scrollTo({ top: 1, behavior: 'smooth' })
  }


  getTimeStamp (index, date) {
    let date1 = new Date(date[0])
    let date2 = new Date(date[1])

    this.controlArray[index].value = [date1.getTime(), date2.getTime()]
  }


  submit () {
    this.dataprov.startSpinner()

    if (this.currentView == this.view.landlord) {
      let data: userType = {
        firstName: this.controlArray[1].value, lastName: this.controlArray[0].value, type: userEnum.landlord, email: this.controlArray[3].value, addres: this.controlArray[2].value,
        tel: this.controlArray[4].value
      }

      if (this.isNew) this.userProv.allusers.push(data)
      else if (this.isEdit) this.userProv.allusers[this.currentUserIndex] = data

    }

    else if (this.currentView == this.view.renter) {
      this.userProv.allusers.push({
        firstName: this.controlArray[1].value, lastName: this.controlArray[0].value, type: userEnum.renter, email: this.controlArray[3].value, addres: this.controlArray[2].value,
        tel: this.controlArray[4].value
      })
    }


    // localStorage.setItem('allUsers', JSON.stringify(this.userProv.allusers))

    this.dataprov.stopSpinner()
    this.isNew = false
    this.isEdit = false
    // this.searchUsers = this.userProv.allusers

    this.resetForm()
  }


  resetForm () {
    this.controlArray.forEach(el => {
      el.value = null
    })
  }


  seach (text) {
    if (!text) this.searchUsers = this.userProv.allusers
    else this.searchUsers = this.userProv.allusers.filter(user => { return (user.firstName.toLowerCase().includes(text) || user.lastName.toLowerCase().includes(text)) })
  }


  showForm () {
    this.isNew = true
  }


  editUser (user: userType) {
    this.isNew = false
    this.isEdit = true

    if ([this.view.landlord, this.view.renter].includes(this.currentView)) {
      this.controlArray[0].value = user.lastName
      this.controlArray[1].value = user.firstName
      this.controlArray[2].value = user.addres
      this.controlArray[3].value = user.email
      this.controlArray[4].value = user.tel
    }

  }


  filterInput (index, input) {
    console.log(input);

  }


  disableSubtmitBtn () {
    let out = false
    for (let el of this.controlArray) {
      if (el.title != 'Adresse' && !el.value) {
        out = true
        break
      }
    }

    return out
  }
}
