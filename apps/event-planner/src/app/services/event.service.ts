import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

export interface eventType {
  room: 'Vida' | 'Pythagore', id: string, startDate: number, endDate: number, name: string, totalSeats: number, guests: guestType[],
  tableType: tableEnum, seats: { tableId: string, persons: string[] }[]
}
export interface guestType { name: string, tableId: string }
export enum tableEnum { U, Réunion, Banquet, 'Salle de classe', 'Theâtre' }

@Injectable({
  providedIn: 'root'
})
export class EventService {
  allEvents: eventType[] = []
  currentEvent: eventType = null

  constructor(
    private afdb: AngularFireDatabase,

  ) { }

  subscribeEvents () {
    this.afdb.list('events').valueChanges().subscribe((events: eventType[]) => {
      this.allEvents = events
    })
  }
}
