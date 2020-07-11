import { Injectable } from '@angular/core';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser
  allusers: userType[] = []

  constructor() { }

  getLandLord () {
    return this.allusers.filter(user => { return user.type == userEnum.landlord })
  }
}
