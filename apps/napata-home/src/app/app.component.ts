import { Component, HostListener } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'napata-home';

  constructor(
    public utilsProv: UtilsService) {

  }

  ngOnInit(){
    this.utilsProv.setScreenSize(window.innerWidth * window.devicePixelRatio, window.innerHeight)
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utilsProv.setScreenSize(window.innerWidth * window.devicePixelRatio, window.innerHeight)
  }
}
