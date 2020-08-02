import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { adminView } from '../../services/interfaces/interfaces.service';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuList = []
  @Input() title = 'Chimmo'
  @Output() menuSeleted = new EventEmitter()
  @Output() toogleMenu = new EventEmitter()

  showTopMenu = false
  currentView = adminView.none
  view = adminView

  constructor(
    public utilsProv: UtilsService
  ) { }

  ngOnInit (): void {
    this._menuSelected(this.currentView)
  }

  _toogleMenu () {
    this.showTopMenu = !this.showTopMenu
    this.toogleMenu.emit()
    console.log(this.showTopMenu)

  }


  _menuSelected (menu) {
    this.showTopMenu = !this.showTopMenu
    this.menuSeleted.emit(menu)
  }
}
