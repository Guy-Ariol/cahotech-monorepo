import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { homeType, houseType } from '../interfaces/interfaces.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  allHouses: houseType[] = []
  allHomes: houseType[] = []

  constructor(
    private afdb: AngularFireDatabase,

  ) { }

  createHome (home: homeType): Promise<any> {
    return new Promise((resolve, reject) => {
      home.id = this.afdb.createPushId()
      this.afdb.object(`homes/${home.id}`).set(home)
        .then(() => resolve())
        .catch(error => reject(error))
    })

  }

  /** */
  createHouse (house: houseType): Promise<any> {
    return new Promise((resolve, reject) => {
      house.id = this.afdb.createPushId()

      this.afdb.object(`houses/${house.id}`).set(house)
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }

  /** subscribe house from the server */
  subscribeAllHouses () {
    this.afdb.list('houses').valueChanges().subscribe((data: houseType[]) => {
      this.allHouses = data
    })
  }

  /** subscribe homes from the server */
  subscribeAllHomes () {
    this.afdb.list('homes').valueChanges().subscribe((data: houseType[]) => {
      this.allHomes = data
    })
  }
}
