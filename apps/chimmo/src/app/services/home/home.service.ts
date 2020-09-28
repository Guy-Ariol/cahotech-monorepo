import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EventEmitter } from 'events';
import { houseType, homeType, moneyType } from 'libs/interfaces/src/lib/interfaces';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { repairType, requestType } from '../interfaces/interfaces.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  allHouses: houseType[] = []
  allHomes: homeType[] = []
  allReparations: repairType[] = []
  allRequests: requestType[] = []

  allTransactions: moneyType[] = []

  currentHome: homeType = null

  constructor(
    private afdb: AngularFireDatabase,
    @Inject(EventEmitter) private event: EventEmitter,
    private userLib: UserService

  ) { }

  createHome (home: homeType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`homes/${home.id}`).set(home)
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }


  createHouse (house: houseType): Promise<any> {
    return new Promise((resolve, reject) => {
      // house.id = this.afdb.createPushId()

      this.afdb.object(`houses/${house.id}`).set(house)
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  /** subscribe house from the server */
  subscribeAllHouses () {
    this.afdb.list('houses').valueChanges().subscribe((data: houseType[]) => {
      if (data) this.allHouses = data
    })
  }

  /** subscribe homes from the server */
  subscribeAllHomes () {
    this.afdb.list('homes').valueChanges().subscribe((data: homeType[]) => {
      if (data) this.allHomes = data
    })
  }

  /**subscribe repartion from the server */
  subscribeReparations () {
    this.afdb.list('reparations').valueChanges().subscribe((data: repairType[]) => {
      this.allReparations = data
    })
  }

  deleteHouse (houseId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`houses/${houseId}`).remove()
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }


  deleteHome (homeId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`homes/${homeId}`).remove()
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }


  updateHome (home): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`homes/${home.id}`).update(home)
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }


  updateHouse (house): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`houses/${house.id}`).update(house)
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getHouseDetails (houseId) {
    return this.allHouses.find(house => house.id == houseId)
  }

  getHousesDetails (): houseType[] {
    let houses = []

    this.userLib?.currentUser?.housesID.forEach(key => {
      if (key) {
        houses.push(this.allHouses.find(house => house.id == key))
      }
    })

    return houses
  }

  updateRepair (reparation: repairType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`reparations/${reparation.id}`).update(reparation)
        .then(() => resolve())
        .catch(error => {
          reject(error)
        })
    })

  }

  createPushKey () {
    return this.afdb.createPushId()
  }

  addNewRequest (req: requestType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`requests/${req.id}`).update(req)
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  subscribeRequests (all: boolean = false) {

    this.afdb.list('requests').valueChanges().subscribe((data: requestType[]) => {
      if (all) this.allRequests = data
      else if (this.userLib.currentUser) this.allRequests = data.filter(req => req.reporterId == this.userLib.currentUser.id)

    })
  }

  updateMoneyTransaction (trans: moneyType) {
    this.afdb.object(`money/${trans.sender}/${trans.id}`).update(trans)
      .then()
      .catch(error => console.log(error))
  }

  subscribeTransactions (all: boolean) {
    if (all) {
      this.afdb.list('money').valueChanges().subscribe((data: moneyType[]) => {
        this.allTransactions = data
      })
    }
    else {
      this.afdb.list(`money/${this.userLib.currentUser.id}`).valueChanges().subscribe((data: moneyType[]) => {
        this.allTransactions = data
      })
    }
  }

  getTransactionDetails (transaction): moneyType {
    for (let attr in transaction) {
      return transaction[attr]
    }
  }

  getSubTransactionDetails (transaction): moneyType[] {
    let out = []
    for (let trans in transaction) {
      out.push(transaction[trans])
    }
    return out
  }
}
