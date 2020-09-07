import { Injectable } from '@angular/core';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';
import { UserService } from 'libs/service/src/lib/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userLib: UserService,

  ) { }

  getLandLord () {
    // return this.allusers.filter(user => { return user.type == userEnum.landlord })
  }

  getRenterbyHomeID (homeID): userType {
    return homeID ? this.userLib.allUsers.find(user => user.homesID?.indexOf(homeID) >= 0) : null
  }
}
