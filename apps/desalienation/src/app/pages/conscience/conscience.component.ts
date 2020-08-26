import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

interface signsType { text: string, like: string[], author: string, timeStamp: number, dislike: string[], id: string, authorID: string }
enum view { newSign, listSign, login, editSign }

@Component({
  selector: 'cahotech-monorepo-conscience',
  templateUrl: './conscience.component.html',
  styleUrls: ['./conscience.component.scss']
})
export class ConscienceComponent implements OnInit {

  currentTopic = 'test'
  allSigns: signsType[] = []
  newSign: signsType = { text: '', author: '', like: [], dislike: [], timeStamp: null, id: '', authorID: '' }
  currentView: view = view.listSign
  view = view
  pendindOperation = {} as { op: string, data: any }
  loginMsg = "Enregistrez-vous pour liker"
  loginMode = 'register'

  constructor(
    private afdb: AngularFireDatabase,
    private userProv: UserService,
    private route: ActivatedRoute

  ) { }

  ngOnInit (): void {
    window.scrollTo({ top: 1, behavior: 'smooth' })

    this.afdb.list('des_signs').valueChanges().subscribe((data: signsType[]) => {
      this.allSigns = data
    })

    this.route.queryParams.subscribe(params => {
      if (params['tab'] == 'sign') this.currentTopic = 'sign'

    });
  }

  addSign () {
    if (this.newSign.text) {
      this.newSign.id = this.afdb.createPushId()
      this.newSign.timeStamp = Date.now()
      this.newSign.authorID = this.userProv.currentUser?.id ? this.userProv.currentUser.id : ''

      this.afdb.object(`des_signs/${this.newSign.id}`).set(this.newSign)
        .then(() => {
          this.currentView = view.listSign
          this.resetNewSign()
        })
        .catch(error => {
          console.log(error);

        })
    }
    else {

    }
  }

  updateSign (type: 'like' | 'dislike', sign: signsType) {
    if (this.userProv.currentUser.id) {
      if (type == 'like') {
        let alreadyliked = false

        if (sign.like) {
          for (let like of sign.like) {
            if (like == this.userProv.currentUser.id) {
              alreadyliked = true
              break
            }
          }

          if (!alreadyliked) sign.like.push(this.userProv.currentUser.id)

          else {
            alert('Vous avez déja liker')
            return 1
          }
        }
        else sign.like = [this.userProv.currentUser.id]

      }

      else if (type == 'dislike') {
        let alreadydisliked = false

        if (sign.dislike) {
          for (let dislike of sign.dislike) {
            if (dislike == this.userProv.currentUser.id)
              alreadydisliked = true
          }

          if (!alreadydisliked) sign.dislike.push(this.userProv.currentUser.id)

          else {
            alert('Vous avez déja disliker')
            return 1
          }
        }
        else sign.dislike = [this.userProv.currentUser.id]


      }

      this.afdb.object(`des_signs/${sign.id}`).update(sign)
        .then(() => {
          alert('Opértion terminée')
        })
        .catch(error => {
          console.log(error);

        })
    }
    else {
      this.pendindOperation = { op: 'updateSign', data: { type: type, sign: sign } }
      this.currentView = view.login
    }

  }

  showToast () {
    let x = document.getElementById("snackbar");

    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  resetNewSign () {
    this.newSign = { text: '', author: '', like: [], dislike: [], timeStamp: null, id: '', authorID: '' }
  }

  onLoggedIn (mode) {
    if (this.pendindOperation.op == 'updateSign') {
      this.updateSign(this.pendindOperation.data.type, this.pendindOperation.data.sign)
      this.currentView = view.listSign
    }
    else if (this.pendindOperation.op == 'editSign') {
      this.editSign(this.pendindOperation.data.sign)
    }
  }

  editSign (sign: signsType) {
    if (sign.authorID) {
      if (this.userProv.currentUser.id) {
        if (sign.authorID == this.userProv.currentUser.id) {
          this.newSign = sign
          this.currentView = view.editSign
        }
        else {
          alert("Vous ne pouvez pas modifier l'article de quelqu'un d'autre .")
        }
      }
      else {
        this.loginMsg = "Connectez-vous pour pouvoir modifier"
        this.pendindOperation = { op: 'editSign', data: { sign: sign } }
        this.loginMode = 'login'
        this.currentView = view.login
      }

    }
    else alert('Pas possible de modifier ce symtome, veuillez contacter le support.')

  }
}
