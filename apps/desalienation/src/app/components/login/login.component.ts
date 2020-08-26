import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService, userType } from '../../services/user.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() msg: string
  @Output() cancel = new EventEmitter
  @Input() mode: 'login' | 'register'
  @Output() done = new EventEmitter

  constructor(
    private userProv: UserService,
    private afdb: AngularFireDatabase
  ) { }

  newUser = { email: '', name: '', password: '', id: '' }


  ngOnInit (): void {
  }

  login () {
    this.userProv.currentUser = this.userProv.allUsers.find(user => user.password = this.newUser.password)

    if(this.userProv.currentUser?.id){
      localStorage.setItem('des_user', this.userProv.currentUser.id)
      this.done.emit('login')
    }
    else{
      alert("Vérifier l'identifiant")
    }
  }

  register () {
    let found = true

    while (found) {
      const pass = this.randomId()
      const user = this.userProv.allUsers.find(user => user.password == pass)
      if (!user) { this.newUser.password = pass; found = false }
    }

    let user: userType = {
      id: this.afdb.createPushId(),
      name: this.newUser.name,
      password: this.newUser.password,
      email: this.newUser.email,
      timeStamp: Date.now()
    }

    this.afdb.object(`users/${user.id}`).set(user)
      .then(() => {
        alert('Votre identifiant est ' + user.password)
        localStorage.setItem('des_user', user.id)
        this.userProv.currentUser = user
        this.done.emit('register')
      })
      .catch(error => {
        console.log(error);

      })
  }

  randomId () {
    let result = '';
    let characters = '0123456789'

    var charactersLength = characters.length;

    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result
  }

  dev(arg){
    let msg = ''

    if (arg == 'msg1') msg = "Envoie de l'identifiant par email en construction"

    alert(msg)
  }
}
