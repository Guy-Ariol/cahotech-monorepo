import { Component, HostListener } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  features = [
    {
      title: 'Gagner en temps',
      pic: 'assets/imgs/read-fast.png'
    },
    {
      title: 'Emporter vous livres partout',
      pic: 'assets/imgs/read-fast.png'
    },
    {
      title: 'Emporter vous livres partout',
      pic: 'assets/imgs/read-fast.png'
    }
  ]

  constructor(
    public utilsProv: UtilsService
  ) {

  }

  ngOnInit () {
    this.utilsProv.setScreenSize(window.innerWidth, window.innerHeight)
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utilsProv.setScreenSize(window.innerWidth, window.innerHeight)
  }
}


