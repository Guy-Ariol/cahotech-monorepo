import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export interface eventType {
  room: 'Vida' | 'Pythagore', id: string, startDate: number, endDate: number, name: string, totalSeats: number, guests: guestType[],
  tableType: tableEnum, seats: { tableId: string, place: { 1: string, 2: string, 3: string, 4: string, 5: string, 6: string } }[], tablePosition: any
}

export interface guestType { name: string, seat: { table: string, place: string } }

export enum tableEnum { U, Réunion, Banquet, Élève, Theâtre }


@Injectable({
  providedIn: 'root'
})
export class EventService {

  allEvents: eventType[] = []
  currentEvent = {} as eventType
  currentTableID = ''
  selectedGuest = ''
  rotationAngle = 'rotate(0deg)'

  tablePosition = {} as { U: '', Réunion: '', Éléve: '', Theâtre: '', Banquet: '' }
  index = 0

  constructor(
    private afdb: AngularFireDatabase,

  ) { }

  subscribeEvents () {
    this.afdb.list('events').valueChanges().subscribe((events: eventType[]) => {
      this.allEvents = events
      const id = this.currentEvent.id

      if (id) {
        this.currentEvent = events.find(ev => ev.id = id)
        this.index = this.currentEvent.seats?.length | 0
      }
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

  getCurrentTable () {
    if (this.currentEvent.seats) return this.currentEvent.seats.find(seat => seat.tableId == this.currentTableID)
    else null
  }

  updateCurrentEvent () {
    this.afdb.object(`events/${this.currentEvent.id}`).update(this.currentEvent)
      .then(() => {

      })
      .catch(error => {
        console.log(error);

      })
  }
}
