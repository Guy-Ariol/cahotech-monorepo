import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { appView } from '../../services/interfaces/interfaces.service';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { ActivatedRoute } from '@angular/router';

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
  view = appView
  currentView = appView.none

  constructor(
    public utilsProv: UtilsService,
    private route: ActivatedRoute

  ) {
    this.route.queryParams.subscribe(params => {
      this.currentView = params.view
      this.showTopMenu = !this.showTopMenu
    })
  }

  ngOnInit (): void {
    this._menuSelected(this.currentView)
  }

  _toogleMenu () {
    this.showTopMenu = !this.showTopMenu
    this.toogleMenu.emit(this.showTopMenu)

    this.menuSeleted.emit(this.currentView)
  }


  _menuSelected (menu) {
    this.currentView = menu
    this.showTopMenu = !this.showTopMenu
    this.menuSeleted.emit(menu)
  }
}
