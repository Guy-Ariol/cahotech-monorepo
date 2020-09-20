import { Component, OnInit, Input } from '@angular/core';
import { docEnum } from '@cahotech-monorepo/interfaces';
import Webcam from 'webcam-easy';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {
  isCapturing = false

  done = false
  screenWidth = 0
  screenHeight = 0
  webcam

  pics: { title: string, url: string, type: docEnum }[] = []

  constructor(
    public homeProv: HomeService

  ) { }

  ngOnInit (): void {
    this.screenHeight = screen.availHeight
    this.screenWidth = screen.availWidth

    if (this.homeProv.currentHome.doc) this.pics = this.homeProv.currentHome.doc
  }

  initWebcam () {
    setTimeout(() => {
      const webcamElement = document.getElementById('webcam');
      const canvasElement = document.getElementById('canvas');
      const snapSoundElement = document.getElementById('snapSound');

      if (webcamElement && canvasElement) {
        this.webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement)

        this.webcam.start()
          .then(result => {
            console.log("webcam started");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }, 500);
  }

  takePic () {
    let picture = this.webcam.snap();
    this.pics[this.pics.length - 1] = { url: picture, title: Date.now().toString(), type: null }

    this.done = true
  }

  stopWebcam () {
    if (this.webcam) this.webcam.stop()
  }

  toogleView () {
    this.webcam.flip()
  }

  submit () {
    this.isCapturing = false
    this.stopWebcam()
    this.done = true

    this.homeProv.currentHome.doc = this.pics
    this.homeProv.updateHome(this.homeProv.currentHome)
      .then()
      .catch(error => {
        console.log(error);
      })

    console.log(this.homeProv.currentHome)

  }

  goback () {
    this.stopWebcam()
    window.history.back()
  }

  getPicTypes () {
    let out = []

    for (let t in docEnum) {
      if (docEnum[t] && !parseInt(docEnum[t])) out.push({ label: docEnum[t], value: t })
    }

    return out
  }

  pushNewFoto () {
    this.pics.push({ title: '', type: null, url: '' })
  }
}
