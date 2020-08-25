import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

interface signsType { text: string, like: number, author: string, timeStamp: number, dislike: number, id: string }

@Component({
  selector: 'cahotech-monorepo-conscience',
  templateUrl: './conscience.component.html',
  styleUrls: ['./conscience.component.scss']
})
export class ConscienceComponent implements OnInit {

  currentTopic = 'sign'
  allSigns: signsType[] = []
  isNewSign = false
  newSign: signsType = { text: '', author: '', like: 0, dislike: 0, timeStamp: null, id: '' }
  toastMsg = ''

  constructor(
    private afdb: AngularFireDatabase

  ) { }

  ngOnInit (): void {
    window.scrollTo({ top: 1, behavior: 'smooth' })

    this.afdb.list('des_signs').valueChanges().subscribe((data: signsType[]) => {
      this.allSigns = data
    })
  }

  addSign () {
    if (this.newSign.text) {
      this.newSign.id = this.afdb.createPushId()
      this.newSign.timeStamp = Date.now()
      this.afdb.object(`des_signs/${this.newSign.id}`).set(this.newSign)
        .then(() => {
          this.isNewSign = false
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
    if (type == 'like') {
      sign.like++
    }

    else if (type == 'dislike') {
      sign.dislike--
    }

    this.afdb.object(`des_signs/${sign.id}`).update(sign)
      .then(() => {
        // this.showToast()
      })
      .catch(error => {
        console.log(error);

      })
  }

  showToast () {
    let x = document.getElementById("snackbar");

    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  resetNewSign () {
    this.newSign = { text: '', author: '', like: 0, dislike: 0, timeStamp: null, id: '' }
  }

}
