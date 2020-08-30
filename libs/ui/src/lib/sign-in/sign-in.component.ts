import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UserService } from "libs/service/src/lib/user/user.service";

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


    else if (!this.validateForm.value.password || this.validateForm.value.password.length < 6)
      this.validateForm.get('password').setErrors({})

    else if (this.validateForm.valid) {
      this.utils.startSpinner()

      this.userLib.signIn(this.validateForm.value)
        .then(res => {
          this.utils.stopSpinner()
          // this.utils.showToast('success', 'Vous etes connecté', 'Félicitation')
          this.validateForm.reset()
          // this.router.navigate(['load'])
        })
        .catch(error => {
          console.log(error);
          let msg = ''

          if (error.code == "auth/user-not-found") msg = "Cet email n'existe pas!"
          else if (error.code = "auth/wrong-password") msg = "Mot de passe incorrect"

          console.log(msg);


          this.utils.stopSpinner()
          this.utils.showToast('error', msg, 'Érreur')
        })
    }
  }
}
