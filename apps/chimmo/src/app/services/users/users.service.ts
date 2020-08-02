import { Injectable } from '@angular/core';
import { userType, userEnum } from '@cahotech-monorepo/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getLandLord () {
    // return this.allusers.filter(user => { return user.type == userEnum.landlord })
  }
}
