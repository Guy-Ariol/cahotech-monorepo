import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UserService } from "libs/service/src/lib/user/user.service";
import { userEnum } from '@cahotech-monorepo/interfaces';

@Component({
  selector: 'lib-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /** variable for login form
  *
  * @type {FormGroup}
  * @memberof HomeComponent
  */
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public utils: UtilsService,
    public userLib: UserService,

  ) { }

  /** reset form
   *
   * @memberof HomeComponent
   */
  ngOnInit (): void {

    this.validateForm = this.fb.group({
      email: ['', [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  /** check email and password format and the authenticate. Notify accordingly in error case
   *
   * @memberof HomeComponent
   */
  submitForm (): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (!this.utils.checkEmail(this.validateForm.value.email))
      this.validateForm.get('email').setErrors({})


    else if (!this.validateForm.value.password || this.validateForm.value.password.length < 4)
      this.validateForm.get('password').setErrors({})

    else if (this.validateForm.valid) {
      // this.utils.startSpinner()

      const getUser = this.userLib.allUsers.find(user => user.email == this.validateForm.get('email').value)
      if (getUser) {

        // renter or super admin verification
        if ([userEnum.renter, userEnum.superAdmin, userEnum.admin].includes(getUser.type)) {
          if (getUser.adminPass == this.validateForm.get('password').value) {
            this.userLib.currentUser = getUser
            this.userLib.emitEvent('logged in', getUser.id)
          }
          else {
            console.log('asdf');
            this.utils.showToast('error', "Mot de passe incorrect", '', 'toast-top-center')
          }
        }

        // landlord authenfication
        else {
          console.log('23');

          this.userLib.signIn(this.validateForm.value)
            .then(res => {
              this.validateForm.reset()
            })
            .catch(error => {
              console.log(error);
              let msg = ''

              if (error.code == "auth/user-not-found") msg = "Cet email n'existe pas!"
              else if (error.code = "auth/wrong-password") msg = "Mot de passe incorrect"

              console.log(msg);

              this.utils.showToast('error', msg, 'Érreur')
            })
        }
      }
      else {
        console.log('no user');
        this.utils.showToast('error', "Cet E-mail n'est pas dans le système", '', 'toast-top-center')
      }
    }
  }
}
