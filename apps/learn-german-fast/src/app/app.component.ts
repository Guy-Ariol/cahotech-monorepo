import { Component, HostListener } from '@angular/core';
import { UtilsService } from "libs/service/src/lib/utils/utils.service";
import { LangService } from './services/lang.service';

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-german-fast';

  constructor(
    public utilsProv: UtilsService,
    public l: LangService

  ) {

  }

  ngOnInit () {
    this.utilsProv.setScreenSize(window.innerWidth * window.devicePixelRatio, window.innerHeight)
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utilsProv.setScreenSize(window.innerWidth * window.devicePixelRatio, window.innerHeight)
  }
}
