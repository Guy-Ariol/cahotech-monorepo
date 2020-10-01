import { Component, OnInit } from '@angular/core';
import { appView, paymentSourceEnum } from '../../services/interfaces/interfaces.service';
import { DataService } from '../../services/data/data.service';
import { UsersService } from '../../services/users/users.service';
import { UtilsService } from "../../../../../../libs/service/src/lib/utils/utils.service";
import { HomeService } from '../../services/home/home.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { billType, consumptionType, homeType, moneyType, userEnum, userType } from '@cahotech-monorepo/interfaces';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cahotech-monorepo-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentView: appView
  view = appView
  currentTitle = 'Selectioner un menu'

  controlArray: Array<{ title: string, value: any, type: string, index: number, list?: Array<any>, id: string }> = [];
  showTopMenu = false
  isNew = false
  isEdit = false
  currentUserIndex: number
  data = {}

  isSelection1 = false

  newCashBox: moneyType = { sender: '', worker: '', home: '', renter: '', sum: null, source: '', app: this.dataprov.appName, id: '', timeStamp: 0, receiver: '', note: '' }

  inputValue?: string;
  optionGroups = [];
  newBill = {} as { temp?: string, house: string, home, landlord: string, water?: number, electricity?: number, timeStamp: number, extra: number, note: string, cable: number }

  step = 0
  cancelAndGoback = false

  constructor(
    public dataprov: DataService,
    public userProv: UsersService,
    public utilsProv: UtilsService,
    public homeProv: HomeService,
    public userLib: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,

  ) {

  }

  ngOnInit (): void {
    // this.homeProv.subscribeAllHouses()
    // this.homeProv.subscribeAllHomes()

    // setting the right context. Especially usefull when browsing back
    this.route.queryParams.subscribe(params => {
      this.currentView = parseInt(params.view)

      this.topMenuSelected(this.currentView)
    })
  }


  topMenuSelected (menu) {
    this.controlArray = []
    // this.toogleMenu()
    this.currentView = menu
    this.router.navigate(['/admin'], { queryParams: { view: menu } })

    if (menu == this.view.landlord) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Gestion bailleurs' }
    else if (menu == this.view.renter) { this.controlArray = this.dataprov.newRenterForm; this.currentTitle = 'Gestion locataires' }
    else if (menu == this.view.house) { this.controlArray = this.dataprov.newHouse; this.currentTitle = 'Gestion résidences' }
    else if (menu == this.view.home) { this.controlArray = this.dataprov.newHome; this.currentTitle = 'Gestion logements' }
    else if (menu == this.view.MoneyIn) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Caisse bailleur' }
    else if (menu == this.view.MoneyIn2) { this.controlArray = this.dataprov.newLandlordForm; this.currentTitle = 'Caisse locataire' }

  }

  /** */
  toogleMenu () {
    this.currentView = appView.none
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

      this.data['id'] = data.user.id

    }
    else if ([appView.house].includes(this.currentView)) {
      this.controlArray[0].value = data.house.name
      this.controlArray[1].value = data.house.equipment
      this.controlArray[3].value = data.house.ownerId
    }
    else if (appView.home == this.currentView) {
      this.controlArray[0].value = data.home.name
      this.controlArray[1].value = data.home.type
      this.controlArray[2].value = data.home.houseId
      this.controlArray[3].value = data.home.landLord
      this.controlArray[4].value = data.home.cost.Caution
      this.controlArray[5].value = data.home.cost["Tarif mensuel"]
      this.controlArray[6].value = data.home.cost["Montant prérequis"]
      this.controlArray[7].value = data.home.rooms
    }
  }

  /** */
  getTimeStamp (index, date) {
    let date1 = new Date(date[0])
    let date2 = new Date(date[1])

    this.controlArray[index].value = [date1.getTime(), date2.getTime()]
  }


  onLandlordSelected (value: string): void {
    this.isSelection1 = true

    this.getHome(this.newCashBox.sender)
  }

  getHome (userId): { home: homeType, renter: userType }[] {
    let homes = []
    let homesIds = []

    try {
      homesIds = this.userLib.allUsers.find(user => user.id == userId).homesID
    } catch (error) {

    }

    homesIds.forEach(homeId => {
      homes.push({
        home: this.homeProv.allHomes.find(home => home.id == homeId), renter: this.userLib.allUsers
          .filter(user => user.homesID && user.homesID.includes(homeId) && user.type == userEnum.renter)[0]
      })
    })

    this.optionGroups = homes

    return homes
  }

  onHomeSelected (arg) {
    console.log(arg);
  }

  getLandlords (): userType[] {
    return this.userLib.allUsers.filter(user => user.type == userEnum.landlord)
  }

  getRenters (): userType[] {
    return this.userLib.allUsers.filter(user => user.type == userEnum.renter)
  }

  onChange (value: string): void {
    this.newCashBox.home = value
  }

  getPaymentSourceList () {
    let out = []
    for (let s in paymentSourceEnum) {
      if (s != '0' && !parseInt(s)) out.push(s)
    }

    return out
  }

  addCash (type) {
    this.newCashBox.id = this.homeProv.createPushKey()
    this.newCashBox.timeStamp = Date.now()
    if (type == 'out') this.newCashBox.sum = this.newCashBox.sum * -1

    let sender = this.userLib.allUsers.find(user => user.id == this.newCashBox.sender)

    if (sender) {
      sender.saldo = + this.newCashBox.sum
      this.userLib.updateUser(sender)
        .then(() => {
          this.homeProv.updateMoneyTransaction(this.newCashBox)
          this.isNew = false
          this.toastr.success('Terminé',)
        })
        .catch(error => {
          console.log(error);

        })
    }
    else {
      console.log('sender not found');

    }
  }

  getTransactionSenderName (trans) {
    if (trans) {
      let sender = this.userLib.allUsers.find(user => user.id == (this.homeProv.getTransactionDetails(trans).sender))
      return sender?.lastName + ' ' + sender?.firstName
    }
    else {
      return {}
    }
  }

  getLandLordTransactions () {
    return this.homeProv.allTransactions.filter(trans => this.userLib.getUserbyId(this.homeProv.getTransactionDetails(trans).sender).type == userEnum.landlord)
  }

  getRenterTransactions () {
    return this.homeProv.allTransactions.filter(trans => this.userLib.getUserbyId(this.homeProv.getTransactionDetails(trans).sender).type == userEnum.renter)
  }

  placeSelected (place) {
    this.newBill.temp = place
    this.step = 1
  }

  loadHomes () {
    this.step = 2
  }

  dateChanged (date) {
    this.newBill.timeStamp = new Date(date).getTime()
  }

  addConsumption () {
    console.log(this.newBill)

    let conso: consumptionType = {
      electricity: this.newBill.electricity,
      water: this.newBill.water,
      timeStamp: this.newBill.timeStamp,
      workerId: '',
      id: this.userLib.createPushId()
    }

    let home = this.homeProv.allHomes.find(home => home.id == this.newBill.home)

    try {
      home.consumption.push(conso)
    } catch (error) {
      home['consumption'] = [conso]
    }

    this.homeProv.updateHome(home)
    this.createBill(conso.id)
  }

  updateConfig (ea, wa) {
    console.log(ea, wa);

  }

  createBill (consumptionId) {
    let home = this.homeProv.getHomeById(this.newBill.home)
    let landlord = this.userLib.getUserbyId(this.newBill.landlord)

    let bill: billType = {
      timeStamp: this.newBill.timeStamp,
      rent: parseInt(home.cost["Tarif mensuel"].toString()),
      waterDiff: this.newBill.water - home.consumption[home.consumption.length - 1]?.water,
      electricityDiff: this.newBill.electricity - home.consumption[home.consumption.length - 1]?.electricity,
      receiver: this.userProv.getRenterbyHomeID(this.newBill.home).id,
      home: this.newBill.home,
      app: this.dataprov.appName,
      note: this.newBill.note,
      extra: this.newBill.extra | 0,
      consumptionId: consumptionId,
      waterUnit: landlord.config.water,
      electricityUnit: landlord.config.electricity,
      cable: this.newBill.cable
    }

    this.homeProv.createBill(bill)
    this.toastr.success('Terminé',)

    this.isNew = false
  }

  getBillReceiverName (bills) {
    let out = ''

    if (bills) {
      let user = this.userLib.getUserbyId(this.homeProv.getBillsDetails(bills).receiver)
      if (user) out = user.lastName + ' ' + user.firstName
    }

    return out
  }

  changeTitle () {
    if (this.currentView == this.view.house) this.currentTitle = 'Nouvelle résidence'
    else if (this.currentView == this.view.landlord) this.currentTitle = 'Nouveau bailleur'
    else if (this.currentView == this.view.renter) this.currentTitle = 'Nouveau locataire'
    else if (this.currentView == this.view.home) this.currentTitle = 'Nouveau logement'
  }

  resetTitle () {
    if (this.currentView == this.view.landlord) { this.currentTitle = 'Gestion bailleurs' }
    else if (this.currentView == this.view.renter) { this.currentTitle = 'Gestion locataires' }
    else if (this.currentView == this.view.house) { this.currentTitle = 'Gestion résidences' }
    else if (this.currentView == this.view.home) { this.currentTitle = 'Gestion logements' }
    else if (this.currentView == this.view.MoneyIn) { this.currentTitle = 'Caisse bailleur' }
    else if (this.currentView == this.view.MoneyIn2) { this.currentTitle = 'Caisse locataire' }

    if (this.cancelAndGoback) {
      history.back()
      this.cancelAndGoback = false
    }
  }

  addAction () {
    let targetMenu = this.currentView == this.view.landlord ? this.view.renter : this.currentView == this.view.house ? this.view.home : ''
    this.topMenuSelected(targetMenu)
    this.changeTitle()
    this.isNew = true

    this.cancelAndGoback = true

    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }
}
