import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';
import { DataService } from '../../services/data/data.service';
import { UserService } from 'libs/service/src/lib/user/user.service';

enum view { menu, newAdmin }

@Component({
  selector: 'cahotech-monorepo-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  currentView = view.menu
  view = view

  menuList = [
    {
      name: 'Crée admin',
      view: view.newAdmin
    },
  ]

  validateForm: FormGroup;

  constructor(
    public utils: UtilsService,
    private fb: FormBuilder,
    private data: DataService,
    private userLib: UserService

  ) { }

  ngOnInit (): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      tel: ['', [Validators.required]],
    });
  }


  submitForm () {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.utils.startSpinner()
      let user = {} as userType

      user.adminPass = this.utils.randomId(4, true)
      user.apps = [this.data.appName]
      user.companyName = 'none'
      user.email = this.validateForm.get('email').value
      user.emailSent = false
      user.firstName = this.validateForm.get('firstName').value
      user.lastName = this.validateForm.get('lastName').value
      user.id = this.userLib.createPushId()
      user.timeStamp = Date.now()
      user.tel = this.validateForm.get('tel').value
      user.type = userEnum.superAdmin

      this.userLib.updateUser(user)
        .then(() => {
          this.utils.stopSpinner()
          this.utils.showToast('info', 'Le super admin a été crée.', 'Créer super admin', 'toast-top-center')
          this.currentView = view.menu
        })
        .catch(error => {
          this.utils.stopSpinner()
          console.log(error);
        })
    }
  }
}
