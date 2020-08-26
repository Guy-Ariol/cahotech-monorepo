import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export interface userType { name: string, email: string, id: string, timeStamp: number, password: string }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = {} as userType
  allUsers: userType[] = []

  constructor(
    private afdb: AngularFireDatabase,

  ) { }

  getCurrentUser () {
    this.currentUser.id = localStorage.getItem('des_user')
  }

  subscribeAllUsers () {
    this.afdb.list('users').valueChanges().subscribe((data: userType[]) => {
      this.allUsers = data
    })
  }
}
