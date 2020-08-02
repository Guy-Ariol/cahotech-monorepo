import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { adminView } from '../../services/interfaces/interfaces.service';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UsersService } from '../../services/users/users.service';

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
    public userProv: UsersService
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

    this.controlArray.forEach((el) => {
      if (el.value) this.controlArray[el.index].error = false

      if (el.title != 'Adresse' && !el.value) { this.controlArray[el.index].error = true; error.push(el.title) }
      else if (el.title == 'E-mail*' && !this.utilsProv.checkEmail(el.value)) { console.log(el.value); this.controlArray[el.index].error = true; error.push(el.title) }

    })

    let msg = 'Verifier '

    error.forEach(el => {
      msg = msg + ', ' + el.replace('*', '')
    })
    return { error: error.length, msg: msg }
  }


  submit () {
    this.utilsProv.startSpinner()

    let res = this.checkInputs()

    if (res.error) {
      this.utilsProv.stopSpinner()
      window.scrollTo({ top: 2, behavior: 'smooth' })

      this.utilsProv.showToast('error', res.msg, 'Érreur', 'toast-top-center', 4000)
    }
    else {

      if (this.currentView == this.view.landlord) {
        let user = {} as userType

        user.firstName = this.controlArray[1].value
        user.lastName = this.controlArray[0].value
        user.type = userEnum.landlord
        user.email = this.controlArray[3].value
        user.addres = this.controlArray[2].value
        user.tel = this.controlArray[4].value

        if (!this.isEdit) this.userLib.allUsers.push(user)
        else this.userLib.allUsers[this.currentUserIndex] = user

      }

      else if (this.currentView == this.view.renter) {
        let user = {} as userType

        user.firstName = this.controlArray[1].value
        user.lastName = this.controlArray[0].value
        user.type = userEnum.renter
        user.email = this.controlArray[3].value
        user.addres = this.controlArray[2].value
        user.tel = this.controlArray[4].value

        this.userLib.allUsers.push(user)
      }
    }

    this.utilsProv.stopSpinner()
    this.done.emit()
    this.resetForm()
  }


  resetForm () {
    this.controlArray.forEach(el => {
      el.value = null
    })
  }
}
