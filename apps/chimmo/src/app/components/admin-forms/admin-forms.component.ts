import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { adminView } from '../../services/interfaces/interfaces.service';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UsersService } from '../../services/users/users.service';
import { DataService } from '../../services/data/data.service';

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

  constructor(
    public userLib: UserService,
    public utilsProv: UtilsService,
    public userProv: UsersService,
    private dataProv: DataService
  ) { }

  ngOnInit (): void {
  }


  getTimeStamp (index, date) {
    let date1 = new Date(date[0])
    let date2 = new Date(date[1])

    this.controlArray[index].value = [date1.getTime(), date2.getTime()]
  }


  filterInput (index, input) {
    console.log(input);

  }


  checkInputs () {
    let error = []

    // check if input field is blank. Also check that email formatting is ok
    this.controlArray.forEach((el) => {
      if (el.value) this.controlArray[el.index].error = false

      if (el.title != 'Adresse' && !el.value) { this.controlArray[el.index].error = true; error.push(el.title) }
      else if (el.title == 'E-mail*' && !this.utilsProv.checkEmail(el.value)) { console.log(el.value); this.controlArray[el.index].error = true; error.push(el.title) }

    })

    let msg = 'Verifier '

    error.forEach(el => {
      msg = msg + ', ' + el.replace('*', '')
    })

    // check that email is not already in use
    for (let user of this.userLib.allUsers) {
      if (this.controlArray.find(el => el.value == user.email)) {
        console.log('email found');
        return { error: true, msg: "Cet e-mail existe déja dans le système." }
      }
    }

    return { error: error.length, msg: msg }
  }


  submit () {
    this.utilsProv.startSpinner()
    window.scrollTo({top: 2, behavior: 'smooth'})

    let res = this.checkInputs()

    if (res.error) {
      this.utilsProv.stopSpinner()
      window.scrollTo({ top: 2, behavior: 'smooth' })

      this.utilsProv.showToast('error', res.msg, 'Érreur', 'toast-top-center', 4000)
      this.utilsProv.stopSpinner()
    }
    else {
      let user = {} as userType

      if (this.currentView == this.view.landlord) {
        user.type = userEnum.landlord
      }

      else if (this.currentView == this.view.renter) {
        user.type = userEnum.renter
      }

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

      if (!this.isEdit) this.userLib.allUsers.push(user)
      else this.userLib.allUsers[this.currentUserIndex] = user

      console.log(user);

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
  }


  resetForm () {
    this.controlArray.forEach(el => {
      el.value = null
    })
  }


  /**get address from google map */
  getAddress (address) {
    console.log(address);
    this.controlArray[2].value = address
  }
}
