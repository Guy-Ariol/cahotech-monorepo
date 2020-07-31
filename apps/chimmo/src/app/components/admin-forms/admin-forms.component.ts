import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { DataService } from '../../services/data/data.service';
import { adminView } from '../../services/interfaces/interfaces.service';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

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
    public userProv: UsersService,
    private dataprov: DataService,
    public utilsProv: UtilsService
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


  submit () {
    this.dataprov.startSpinner()

    if(this.disableSubtmitBtn)

    if (this.currentView == this.view.landlord) {
      let data: userType = {
        firstName: this.controlArray[1].value, lastName: this.controlArray[0].value, type: userEnum.landlord, email: this.controlArray[3].value, addres: this.controlArray[2].value,
        tel: this.controlArray[4].value
      }

      if (!this.isEdit) this.userProv.allusers.push(data)
      else this.userProv.allusers[this.currentUserIndex] = data

    }

    else if (this.currentView == this.view.renter) {
      this.userProv.allusers.push({
        firstName: this.controlArray[1].value, lastName: this.controlArray[0].value, type: userEnum.renter, email: this.controlArray[3].value, addres: this.controlArray[2].value,
        tel: this.controlArray[4].value
      })
    }

    this.dataprov.stopSpinner()
    this.done.emit()
    this.resetForm()
  }


  resetForm () {
    this.controlArray.forEach(el => {
      el.value = null
    })
  }
}
