import { Injectable } from '@angular/core';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { HomeService } from '../home/home.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private userLib: UserService,
    private homeProv: HomeService

  ) { }

  getLandLord () {
    // return this.allusers.filter(user => { return user.type == userEnum.landlord })
  }

  getRenterbyHomeID (homeID): userType {
    return homeID ? this.userLib.allUsers.find(user => user.homesID?.indexOf(homeID) >= 0) : null
  }

  logOut () {
    localStorage.removeItem('chimmo-user')
    this.userLib.emitEvent('logged out', {})
  }

  getSaldo (userId) {
    let out = 0

    if (this.homeProv.getTransactionBySenderId(userId)) {
      this.homeProv.getTransactionBySenderId(userId).forEach(trans => {
        out = out + trans.sum
      })
    }

    return out
  }

  getAllCashIn (id) {
    try {
      return this.homeProv.getTransactionBySenderId(id).filter(item => item.sum > 0)
    } catch (error) {
      return []
    }
  }

  getAllCashOut (id) {
    try {
      return this.homeProv.getTransactionBySenderId(id).filter(item => item.sum < 0)
    } catch (error) {
      return []
    }
  }
}
