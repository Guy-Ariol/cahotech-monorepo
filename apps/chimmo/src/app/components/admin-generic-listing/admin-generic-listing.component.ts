import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../../../../../libs/service/src/lib/user/user.service';
import { userType } from '@cahotech-monorepo/interfaces';
import { adminView } from '../../services/interfaces/interfaces.service';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'admin-generic-listing',
  templateUrl: './admin-generic-listing.component.html',
  styleUrls: ['./admin-generic-listing.component.scss']
})
export class AdminGenericListingComponent implements OnInit {

  @Output() showForm = new EventEmitter()
  @Output() editUser = new EventEmitter()
  @Input() currentView

  view = adminView
  searchUsers: userType[] = []

  constructor(
    public userLib: UserService,
    public utilsProv: UtilsService,

  ) { }

  ngOnInit (): void {
    this.searchUsers = this.userLib.allUsers
  }


  search (text) {
    if (!text) this.searchUsers = this.userLib.allUsers
    else this.searchUsers = this.userLib.allUsers.filter(user => { return (user.firstName.toLowerCase().includes(text) || user.lastName.toLowerCase().includes(text)) })
  }
}
