import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { EventEmitter } from 'events';
import { userType } from "@cahotech-monorepo/interfaces";
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** current logged in user*/
  currentUser: userType = null

  /** current logged in user*/
  currentWorker: userType = null

  /** flag for app booting */
  ontimeAction = true

  /** all user beloging to current CEO */
  myUsers: userType[] = []

  /** all users registered */
  allUsers: userType[] = []

  /** flag for deciding beteween sign in and sign up */
  isSignup = false

  constructor(
    private fbAuth: AngularFireAuth,
    @Inject(EventEmitter) private event: EventEmitter,
    private afdb: AngularFireDatabase,
    private utils: UtilsService
  ) { }

  /**
  * sign out from the app
  * @memberof UserService
  */
  signOut () {
    this.fbAuth.signOut()
    this.currentUser = null
    this.currentWorker = null
  }

  /**
   * watch auth status and fire event in case state changes
   * @memberof UserService
   */
  onAuthChanged () {
    this.fbAuth.onAuthStateChanged(e => {
      if (!this.isSignup) {
        if (e) {
          this.event.emit('logged in', e.uid)
        }
        else {
          this.event.emit('logged out')
        }
      }

      this.isSignup = false
    })
  }

  /**
   * subscsribe user and get updated when database get updated
   * @param {*} userId
   * @memberof UserService
   */
  subscribeUser (userId) {
    this.afdb.object(`users/${userId}`).valueChanges().subscribe((user: userType) => {
      if (user) {
        this.currentUser = user

        if (this.ontimeAction) {
          this.subscribeMyUser()
          this.ontimeAction = false
        }

        //TODO: to be removed before prod
        // this.currentWorker = user.workers['sdfgsdfgsdfgsdfg']
      }
    })
  }

  /** get app updated when users get updated in the database
    *
    * @memberof UserService
    */
  subscribeMyUser () {
    if (this.currentUser.companyName) {
      this.afdb.list('users', ref => ref.orderByChild('companyName').equalTo(this.currentUser.companyName)).valueChanges()
        .subscribe((data: userType[]) => {
          this.myUsers = data
        })
    }
    else {
      console.log('My-user subscription failed');
    }
  }

  /**
   * sign in to the app
   * @param {*} { email, password }
   * @returns {Promise<any>}
   * @memberof UserService
   */
  signIn ({ email, password }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fbAuth.signInWithEmailAndPassword(email, password.trim())
        .then(res => {
          resolve(res.user.uid)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /** register new user to the app
   *
   * @param {userType} user
   * @returns {Promise<any>}
   * @memberof UserService
   */
  signUp (user: userType): Promise<any> {
    user.adminPass = this.utils.randomId(6)
    this.isSignup = true

    return new Promise((resolve, reject) => {
      this.fbAuth.createUserWithEmailAndPassword(user.email, user.adminPass)
        .then(res => {
          user.id = res.user.uid

          this.afdb.object(`users/${res.user.uid}`).update(user)
            .then(() => resolve())
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  }

  /** get app updated when users get updated in the database
    *
    * @memberof UserService
    */
  subscribeAllUser () {
    this.afdb.list('users').valueChanges()
      .subscribe((data: userType[]) => {
        this.allUsers = data
      })
  }

  /** create database unique push id */
  createPushId () {
    return this.afdb.createPushId()
  }

  /** upadate or create user in the database */
  updateUser (user: userType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`users/${user.id}`).update(user)
        .then(() => resolve())
        .catch(error => reject(error))
    })

  }

  batchUpdate (bacth): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object('/').update(bacth)
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  /** delete */
  deleteUser (userId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`users/${userId}`).remove()
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  /** get worker from the database
    *
    * @returns {userType[]}
    * @memberof UserService
    */
  getWorkers (): userType[] {
    let out = []

    for (let worker in this.currentUser.workers) {
      out.push(this.currentUser.workers[worker])
    }

    return out
  }
}
