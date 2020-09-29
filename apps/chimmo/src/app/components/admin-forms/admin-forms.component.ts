import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { appView, roomEquipmentEnum, houseEquipmentEnum } from '../../services/interfaces/interfaces.service';
import { userType, userEnum, roomType, homeType, houseType, roomTypeEnum, homeEnum } from '@cahotech-monorepo/interfaces';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UsersService } from '../../services/users/users.service';
import { DataService } from '../../services/data/data.service';
import { HomeService } from '../../services/home/home.service';

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
  @Input() data
  @Output() done = new EventEmitter

  view = appView
  houseEquipments = []
  autocompleteList1 = []
  autocompleteList2 = []
  autocompleteList3 = []
  rooms: roomType[] = []

  showSummary = false
  telCode = '+'

  constructor(
    public userLib: UserService,
    public utilsProv: UtilsService,
    public userProv: UsersService,
    private dataProv: DataService,
    private homeProv: HomeService,

  ) { }

  ngOnInit (): void {

  }


  ngOnDestroy () {

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

      if (!['Adresse', 'Proprietaire'].includes(el.title) && !el.value) { this.controlArray[el.index].error = true; error.push(el.title) }
      else if (el.title == 'E-mail*' && !this.utilsProv.checkEmail(el.value)) { console.log(el.value); this.controlArray[el.index].error = true; error.push(el.title) }

    })

    let msg = 'Verifier '

    error.forEach(el => {
      msg = msg + el.replace('*', '') + ', '
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
    }
    else {
      let user = {} as userType

      if (![this.view.home, this.view.house].includes(this.currentView)) {
        user.firstName = this.controlArray[1].value
        user.lastName = this.controlArray[0].value
        user.email = this.controlArray[3].value
        user.addres = this.controlArray[2].value
        user.tel = this.controlArray[4].value

        if (!this.isEdit) {
          user.apps = [this.dataProv.appName]
          user.id = this.userLib.createPushId()
          user.timeStamp = Date.now()
          user.adminPass = ''
          user.type = userEnum.landlord
          user.emailSent = false
        }
        else {
          user.id = this.data.id
        }
      }

      if (this.currentView == this.view.landlord) {
        user.type = userEnum.landlord

        if (this.isEdit) {
          console.log(user);

          this.userLib.updateUser(user)
            .then(() => {
              this.done.emit()
              this.resetForm()
              this.utilsProv.stopSpinner()
              this.utilsProv.showToast('info', 'Opération réussi', '', 'toast-top-center')
            })
            .catch(error => {
              console.log(error);
              this.utilsProv.stopSpinner()
            })
        }
        else {
          this.userLib.signUp(user)
            .then(() => {
              this.done.emit()
              this.resetForm()
              this.utilsProv.stopSpinner()
              this.utilsProv.showToast('info', 'Opération réussi', '', 'toast-top-center')
            })
            .catch(error => {
              console.log(error);
              this.utilsProv.showToast('error', error.message, '', 'toast-top-center', 6000)
              this.utilsProv.stopSpinner()
            })
        }

      }

      else if (this.currentView == this.view.renter) {
        user.type = userEnum.renter
        user.adminPass = this.utilsProv.randomId(4)
        user.landlordId = this.controlArray.find(c => c.title == 'Bailleur*').value
        user.homesID = []

        let home = this.homeProv.allHomes.find(home => home.id == this.controlArray[6].value)
        user.homesID[home.id] = home.cost

        home.landLord[user.landlordId] = user.id

        let batch = {}
        batch[`users/${user.id}`] = user
        batch[`users/${user.landlordId}/renters/${user.id}`] = user
        batch[`homes/${home.id}`] = home

        this.userLib.batchUpdate(batch)
          .then(() => {
            this.done.emit()
            this.resetForm()
            this.utilsProv.stopSpinner()
            this.utilsProv.showToast('info', 'Opération réussi', '', 'toast-top-center')
          })
          .catch(error => {
            console.log(error);
            this.utilsProv.stopSpinner()
          })

      }

      else if (this.currentView == this.view.home) {
        this.utilsProv.startSpinner()

        let newHome: homeType = {
          name: this.controlArray[0].value,
          rooms: this.rooms,
          type: parseInt(homeEnum[this.controlArray[1].value]),
          id: this.userLib.createPushId(),
          houseId: this.controlArray[2].value,
          cost: {
            Caution: this.controlArray[3].value,
            "Tarif mensuel": this.controlArray[4].value,
            "Montant prérequis": this.controlArray[5].value
          },
          timeStamp: Date.now(),
          landLord: [{ Id: this.controlArray[3].value, renterId: '' }],
          doc: [],
          reparations: [],
          consumption: []
        }
        // console.log(newHome)

        // get the corresponding house
        let house = this.homeProv.allHouses.find(house => house.id == newHome.houseId)
        if (house) {

          // update home reference in house
          if (house.homeList) house.homeList.push(newHome.id)
          else house.homeList = [newHome.id]

          // update house in the server
          this.homeProv.updateHouse(house)
            .then(() => {

              // upload new home to the server
              this.homeProv.createHome(newHome)
                .then(() => {

                  // update landlord as well
                  let landlord = this.userLib.allUsers.find(user => user.id == this.controlArray[3].value)

                  if (landlord?.homesID) landlord.homesID.push(newHome.id)
                  else {
                    landlord['homesID'] = [];
                    landlord.homesID.push(newHome.id)
                  }

                  this.userLib.updateUser(landlord)
                    .then(() => {
                      this.done.emit()
                      this.resetForm()
                      this.utilsProv.stopSpinner()
                      this.utilsProv.showToast('info', 'Opération réussi', '', 'toast-top-center')
                    })
                    .catch(error => {
                      console.log(error);

                    })
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
        else {
          this.utilsProv.showToast('error', "Une érreur s'est produite", '', 'toast-top-center')
        }
      }

      else if (this.currentView == this.view.house) {
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
        if (owner.housesID) owner.housesID.push(newHouse.id)
        else owner.housesID = [newHouse.id]

        this.userLib.updateUser(owner)
          .then(() => {
            this.homeProv.createHouse(newHouse)
              .then(() => {
                this.done.emit()
                this.resetForm()
                this.utilsProv.stopSpinner()
                this.utilsProv.showToast('info', 'Opération réussi', '', 'toast-top-center')

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


  getRoomTypeList () {
    return Object.keys(roomTypeEnum).filter(el => el != '0' && !parseInt(el))
  }


  getRoomEquipmentList () {
    return Object.keys(roomEquipmentEnum).filter(el => el != '0' && !parseInt(el))
  }


  getRoomCost () {
    const t = { Caution: null, 'Tarif mensuel': null, 'Avance Checkin': null, 'Tarif eau': null, 'Tarif électricité': null }
    let out = []

    for (let key in t) {
      out.push(key)
    }

    return out
  }


  getHouseEquipmentList () {
    return Object.keys(houseEquipmentEnum).filter(el => el != '0' && !parseInt(el))
  }


  geHomeDetails (homeId): homeType {
    return this.homeProv.allHomes.find(home => home.id == homeId)
  }

  getHouseDetails (house) {
    return this.homeProv.allHouses.find(house => house.id == house.id)
  }

  //TODO selected all /unselect all checkbox
  houseEquipmentSelected (val) {
    //TODO get rid of this varible and use only controlArray.value instead
    this.houseEquipments = val
    this.controlArray[1].value = val

  }


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
    this.controlArray[7].value = 1
  }


  gotoSummary () {
    let res = this.checkInputs()

    if (res.error) {
      this.utilsProv.stopSpinner()
      window.scrollTo({ top: 2, behavior: 'smooth' })

      this.utilsProv.showToast('error', res.msg, 'Érreur', 'toast-top-center', 4000)
      this.utilsProv.stopSpinner()
    }
    else {
      this.controlArray[4].value = this.telCode + this.controlArray[4].value.toString()

      this.showSummary = true

      setTimeout(() => {
        if (this.utilsProv.isDesktop) window.scrollTo({ top: 1, behavior: 'smooth' })

        else if (this.currentView == this.view.house) window.scrollBy(0, 400)

        else if (this.currentView == this.view.home) window.scrollBy(0, 400)

        else if (this.currentView == this.view.landlord) window.scrollBy(0, 400)

        else if (this.currentView == this.view.renter) window.scrollBy(0, 400)
      }, 150);
    }

  }


  refreshInputData () {
    this.autocompleteList1 = []

    if ([this.view.house].includes(this.currentView)) {
      this.autocompleteList1 = this.userLib.allUsers.filter(user => { return user.type == userEnum.landlord && user.apps?.includes('chimmo') })
      this.houseEquipments = this.controlArray[1].value
    }

    else if (this.currentView == this.view.home) {
      this.autocompleteList1 = Object.keys(homeEnum).filter(el => el != '0' && !parseInt(el))
      this.autocompleteList2 = this.homeProv.allHouses
      this.autocompleteList3 = this.userLib.allUsers.filter(user => { return user.type == userEnum.landlord && user.apps?.includes('chimmo') })
    }

    else if (this.currentView == this.view.renter) {
      this.autocompleteList1 = this.homeProv.allHomes
      this.autocompleteList2 = this.userLib.allUsers.filter(user => { return user.type == userEnum.landlord && user.apps?.includes('chimmo') })
    }
  }

  scrollTop () {
    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 100);
  }
}
