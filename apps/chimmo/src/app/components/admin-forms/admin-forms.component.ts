import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { adminView, roomType, homeEnum, roomTypeEnum, roomEquipmentEnum, homeType, houseType, houseEquipmentEnum } from '../../services/interfaces/interfaces.service';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UsersService } from '../../services/users/users.service';
import { DataService } from '../../services/data/data.service';
import { HomeService } from '../../services/home/home.service';
import * as internalEvent from 'events';

@Component({
  selector: 'admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.scss']
})
export class AdminFormsComponent implements OnInit {

  @Input() controlArray: Array<{ title: string, value: any, type: string, index: number, list?: Array<any>, id: string, error: boolean }> = [];
  @Input() currentView
  @Input() currentUserIndex
  @Input() isEdit: boolean
  @Output() done = new EventEmitter

  view = adminView
  houseEquipments = []
  autocompleteList1 = []
  autocompleteList2 = []
  rooms: roomType[] = []

  showSummary = false

  constructor(
    public userLib: UserService,
    public utilsProv: UtilsService,
    public userProv: UsersService,
    private dataProv: DataService,
    private homeProv: HomeService,
    // private event: internalEvent

  ) { }

  ngOnInit (): void {
    // this.event.on('received data from server', () => {
    //   console.info('admin-formcomponent Listener');

    //   this.refreshInputData()
    // })
  }

  ngOnDestroy() {

  }

  ngDoCheck () {
    this.refreshInputData()
  }

  getTimeStamp (index, date) {
    let date1 = new Date(date[0])
    let date2 = new Date(date[1])

    this.controlArray[index].value = [date1.getTime(), date2.getTime()]
  }


  filterInput (type: 'user' | 'home' | 'room', input: string) {
    if (input) {
      if (type == 'user') {
        let out = this.userLib.allUsers?.filter(user => {
          return user.firstName?.toLowerCase().includes(input.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(input.toLowerCase()) || user.email?.toLowerCase().includes(input.toLowerCase())
        })

        this.getLandLord(out)
      }
      else if (type == 'home') {

      }

    }
    else {
      if (type == 'user') {
        this.getLandLord()
      }
      else if (type == 'home') {

      }

    }
  }


  checkInputs () {
    let error = []

    // check if input field is blank. Also check that email formatting is ok
    this.controlArray.forEach((el) => {
      if (el.value && this.controlArray[el.index]) this.controlArray[el.index].error = false

      if (el.title != 'Adresse' && !el.value) { this.controlArray[el.index].error = true; error.push(el.title) }
      else if (el.title == 'E-mail*' && !this.utilsProv.checkEmail(el.value)) { console.log(el.value); this.controlArray[el.index].error = true; error.push(el.title) }

    })

    let msg = 'Verifier '

    error.forEach(el => {
      msg = msg + ', ' + el.replace('*', '')
    })

    // TODO check that email is not already in use
    // for (let user of this.userLib.allUsers) {
    //   // let out = this.controlArray.find(el => el.value == user.email)
    //   // console.log(out);
    //   console.log(user);


    //   if (user.email == this.controlArray[2].value) {
    //     console.log('email found', user.email);
    //     return { error: true, msg: "Cet e-mail existe déja dans le système." }
    //   }
    // }

    return { error: error.length, msg: msg }
  }


  submit () {
    this.utilsProv.startSpinner()
    window.scrollTo({ top: 2, behavior: 'smooth' })

    let res = this.checkInputs()

    if (res.error) {
      this.utilsProv.stopSpinner()
      window.scrollTo({ top: 2, behavior: 'smooth' })

      this.utilsProv.showToast('error', res.msg, 'Érreur', 'toast-top-center', 4000)
      this.utilsProv.stopSpinner()
    }
    else {
      let user = {} as userType

      if (![adminView.home, adminView.house].includes(this.currentView)) {
        user.firstName = this.controlArray[1].value
        user.lastName = this.controlArray[0].value
        user.email = this.controlArray[3].value
        user.addres = this.controlArray[2].value
        user.tel = this.controlArray[4].value
        user.apps = [this.dataProv.appName]
        // user.companyName = this.userLib.currentUser.companyName
        user.emailSent = false
        user.id = this.userLib.createPushId()
        user.timeStamp = Date.now()
        user.adminPass = ''
        user.type = userEnum.landlord
      }

      if (this.currentView == this.view.landlord) {
        user.type = userEnum.landlord

        this.userLib.signUp(user)
          .then(() => {
            this.done.emit()
            this.resetForm()
            this.utilsProv.stopSpinner()
          })
          .catch(error => {
            console.log(error);
            this.utilsProv.stopSpinner()
          })
      }

      else if (this.currentView == this.view.renter) {
        user.type = userEnum.renter
        user.adminPass = this.utilsProv.randomId(6)
        user.landlordId = this.controlArray.find(c => c.title == 'Bailleur').value

        let batch = {}
        batch[`users/${user.id}`] = user
        batch[`${user.landlordId}/renters/${user.id}`] = user

        this.userLib.batchUpdate(batch)
          .then(() => {
            this.done.emit()
            this.resetForm()
            this.utilsProv.stopSpinner()
          })
          .catch(error => {
            console.log(error);
            this.utilsProv.stopSpinner()
          })

      }

      else if (this.currentView == adminView.home) {
        this.utilsProv.startSpinner()

        let newHome: homeType = {
          name: this.controlArray[0].value,
          rooms: this.rooms,
          type: this.controlArray[1].value,
          id: '',
          houseId: '',
          cost: {
            Caution: this.controlArray[3].value, "Tarif mensuel": this.controlArray[4].value,
            "Avance Checkin": this.controlArray[5].value, "Tarif eau": this.controlArray[6].value,
            "Tarif électricité": this.controlArray[7].value
          },
          timeStamp: Date.now()
        }

        console.log(newHome)
        this.homeProv.createHome(newHome)
          .then(() => {
            this.done.emit()
            this.resetForm()
            this.utilsProv.stopSpinner()
          })
          .catch(error => {
            console.log(error);
            this.utilsProv.stopSpinner()
          })
      }

      else if (this.currentView == adminView.house) {
        this.utilsProv.startSpinner()

        let newHouse: houseType = {
          name: this.controlArray[0].value,
          address: this.controlArray[2].value,
          equipment: this.houseEquipments,
          id: this.userLib.createPushId(),
          ownerId: this.controlArray[3].value,
          timeStamp: Date.now()
        }

        let owner = this.userLib.allUsers.find(user => user.id == newHouse.ownerId)
        if (owner.houses) owner.houses.push(newHouse.id)
        else owner.houses = [newHouse.id]

        this.userLib.updateUser(owner)
          .then(() => {
            this.homeProv.createHouse(newHouse)
              .then(() => {
                this.done.emit()
                this.resetForm()
                this.utilsProv.stopSpinner()

                setTimeout(() => {
                  this.refreshInputData()
                }, 1000);
              })
              .catch(error => {
                console.log(error);
                this.utilsProv.stopSpinner()
              })
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }

  /** */
  resetForm () {
    this.controlArray.forEach(el => {
      el.value = null
    })
  }

  /**get address from google map */
  getAddress (address) {
    address = document.getElementsByClassName('maps')[0]['value']
    this.controlArray[2].value = address
  }

  getLandLord (users?: userType[]) {
    if (users) {
      this.autocompleteList1 = users.filter(user => { return (user.type == userEnum.landlord && user.apps?.includes('chimmo')) })
    }
    else {
      this.autocompleteList1 = this.userLib.allUsers.filter(user => { return (user.type == userEnum.landlord && user.apps?.includes('chimmo')) })
    }
  }

  /** getUserFullName */
  getUserFullName (userId) {
    let userFound

    if (userId) {
      let res = this.userLib.allUsers.find(user => user.id == userId)
      userFound = res?.lastName + ' ' + res?.firstName
    }

    return userFound
  }

  /** getUserEmail */
  getUserEmail (userId) {
    let userFound

    if (userId) {
      let res = this.userLib.allUsers.find(user => user.id == userId)
      userFound = res?.email
    }

    return userFound
  }

  /** */
  //TODO selected all /unselect all checkbox
  houseEquipmentSelected (val) {
    //TODO get rid of this varible and use only controlArray.value instead
    this.houseEquipments = val

    this.controlArray[1].value = val

  }

  /** */
  addRoom () {
    this.rooms.push({
      type: null,
      surface: null,
      equipment: [],
    })

    setTimeout(() => {
      if (this.rooms.length == 1) window.scrollBy(0, 200);
      else if (this.rooms.length > 1) window.scrollBy(0, 300)
    }, 100);

    /** deactivate input validation */
    this.controlArray[8].value = 1
  }

  /** */
  getRoomTypeList () {
    return Object.keys(roomTypeEnum).filter(el => el != '0' && !parseInt(el))
  }

  /** */
  getRoomEquipmentList () {
    return Object.keys(roomEquipmentEnum).filter(el => el != '0' && !parseInt(el))
  }

  /** */
  getRoomCost () {
    const t = { Caution: null, 'Tarif mensuel': null, 'Avance Checkin': null, 'Tarif eau': null, 'Tarif électricité': null }
    let out = []

    for (let key in t) {
      out.push(key)
    }

    return out
  }

  /** */
  gotoSummary () {
    let res = this.checkInputs()

    if (res.error) {
      this.utilsProv.stopSpinner()
      window.scrollTo({ top: 2, behavior: 'smooth' })

      this.utilsProv.showToast('error', res.msg, 'Érreur', 'toast-top-center', 4000)
      this.utilsProv.stopSpinner()
    }
    else {
      this.showSummary = true

      setTimeout(() => {
        if (this.currentView == adminView.house) window.scrollBy(0, 400)

        if (this.currentView == adminView.home) window.scrollBy(0, 400)

        if (this.currentView == adminView.landlord) window.scrollBy(0, 400)

        if (this.currentView == adminView.renter) window.scrollBy(0, 400)
      }, 150);
    }

  }

  /** */
  getHouseEquipmentList () {
    return Object.keys(houseEquipmentEnum).filter(el => el != '0' && !parseInt(el))
  }

  /** */
  refreshInputData(){
    // init variables

    this.autocompleteList1 = []

    if ([adminView.renter, adminView.house].includes(this.currentView))
      this.autocompleteList1 = this.userLib.allUsers.filter(user => { return user.type == userEnum.landlord && user.apps?.includes('chimmo') })

    else if (this.currentView == adminView.home) {
      this.autocompleteList1 = Object.keys(homeEnum).filter(el => el != '0' && !parseInt(el))
      this.autocompleteList2 = this.homeProv.allHouses
    }
  }
}
