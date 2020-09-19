import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { EventEmitter } from 'events';
import { houseType, homeType } from 'libs/interfaces/src/lib/interfaces';
import { UserService } from 'libs/service/src/lib/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  allHouses: houseType[] = []
  allHomes: homeType[] = []

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
}
