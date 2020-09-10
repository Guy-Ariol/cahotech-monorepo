import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export interface eventType {
  room: 'Vida' | 'Pythagore', id: string, startDate: number, endDate: number, name: string, totalSeats: number, guests: guestType[],
  tableType: tableEnum, seats: { tableId: string, persons: string[] }[], tablePosition: any
}

export interface guestType { name: string, tableId: string }

export enum tableEnum { U, Réunion, Banquet, Élève, Theâtre }


@Injectable({
  providedIn: 'root'
})
export class EventService {

  allEvents: eventType[] = []
  currentEvent = {} as eventType

  tablePosition = {} as { U: '', Réunion: '', Éléve: '', Theâtre: '', Banquet: '' }

  constructor(
    private afdb: AngularFireDatabase,

  ) { }

  subscribeEvents () {
    this.afdb.list('events').valueChanges().subscribe((events: eventType[]) => {
      this.allEvents = events
    })

    this.afdb.object(`super-admin/cahocenter`).valueChanges()
      .subscribe((data: any) => {
        this.tablePosition = data
      })
  }

  createEvent (event: eventType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afdb.object(`events/${event.id}`).update(event)
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })

  }
}
