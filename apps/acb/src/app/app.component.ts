import { Component, HostListener } from '@angular/core';
import { StaticDataService } from './services/static-data.service';
import { UtilsService } from "libs/service/src/lib/utils/utils.service";
import { UserService } from "libs/service/src/lib/user/user.service";

@Component({
  selector: 'cahotech-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** nav bar title
  *
  * @memberof AppComponent
  */
  headerTitle = 'Africa Cash Back'

  /** current menu state, collapsed or not
   *
   * @memberof AppComponent
   */
  isCollapsed = true;

  constructor(
    public constant: StaticDataService,
    public utils: UtilsService,
    public userProv: UserService,


  ) { }

  /** check current device dimensions
  *
  * @private
  * @param {*} event
  * @memberof AppComponent
  */
  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utils.setScreenSize(window.innerWidth, window.innerHeight)

    if(window.innerHeight < 400){
      // document.getElementById('footer').remove()
    }
  }

  ngOnInit () {
    this.utils.setScreenSize(window.innerWidth, window.innerHeight)
  }


  /** close side bar menu
     *
     * @memberof AppComponent
     */
  closeMenu () {
    this.isCollapsed = !this.isCollapsed
  }


  logoff () {

  }


  checkNav () {

  }
}
