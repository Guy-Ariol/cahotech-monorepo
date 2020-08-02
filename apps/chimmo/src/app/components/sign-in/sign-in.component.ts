import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UserService } from 'libs/service/src/lib/user/user.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  credentials = { email: '', password: '' }
  formError = []

  constructor(
    public utilsProv: UtilsService,
    private userLib: UserService,
  ) { }

  ngOnInit (): void {
  }


  signIn () {
    this.utilsProv.startSpinner()
    this.formError = []

    if (!this.utilsProv.checkEmail(this.credentials.email)) {
      this.utilsProv.stopSpinner()
      this.utilsProv.showToast('error', 'Vérifier le e-mail', 'Érreur', 'toast-top-center')
      this.formError.push('email')
    }

    else if (this.credentials.password.length < 6) {
      this.utilsProv.stopSpinner()
      this.utilsProv.showToast('error', 'Vérifier le mot de passe', 'Érreur', 'toast-top-center')
      this.formError.push('password')
    }


    if (!this.formError.length) {
      this.userLib.signIn(this.credentials)
        .then(() => {
          this.utilsProv.stopSpinner()
        })
        .catch(error => {
          this.utilsProv.stopSpinner()

          let msg = ''
          if (error.code == 'auth/user-not-found') msg = "Ce compte n'existe pas !"
          if (error.code == 'auth/wrong-password') msg ="Mot de passe incorrect !"

          this.utilsProv.showToast('error', msg, '', 'toast-top-center')
        })
    }

  }
}
