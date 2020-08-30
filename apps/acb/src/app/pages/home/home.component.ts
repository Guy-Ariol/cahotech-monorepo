import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { StaticDataService } from '../../services/static-data.service';


/** home page
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'acb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** variable for login form
   *
   * @type {FormGroup}
   * @memberof HomeComponent
   */
  validateForm: FormGroup;

  /**
   *Creates an instance of HomeComponent.
   * @param {UtilsService} utils
   * @param {UserService} userProv
   * @param {FormBuilder} fb
   * @param {Router} router
   * @memberof HomeComponent
   */
  constructor(
    public utils: UtilsService,
    public userProv: UserService,
    private fb: FormBuilder,
    private router: Router,
    private data: StaticDataService

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

      this.userProv.signIn(this.validateForm.value)
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

          this.utils.stopSpinner()
          this.utils.showToast('error', msg, 'Érreur')
        })
    }
  }

  /** on tag check if card is valid the navigate to first page
   *
   * @param {*} tagId
   * @memberof HomeComponent
   */
  onTag (tagId) {
    let found = false

    if (this.userProv.currentUser.workers) {
      for (let worker of this.userProv.getWorkers()) {
        if (worker && Object.keys(worker["cards"]).includes(tagId)) {
          this.userProv.currentWorker = worker
          if (this.utils.blockedRoute) { this.router.navigate([this.utils.blockedRoute]); this.utils.blockedRoute = '' }
          else this.router.navigate(['load'])
          found = true;
          break;
        }
      }

      if (found) {
        //  this.utils.showToast('success', 'Connexion réussie', 'Succès')
      }
      else
        this.utils.showToast('error', 'Carte employé inconnue', 'Erreur')

    }
  }
}
