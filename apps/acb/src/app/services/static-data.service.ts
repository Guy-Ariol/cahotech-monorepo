import { Injectable } from '@angular/core';

/**
 * APP static data
 * @export
 * @class StaticDataService
 */
@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  /** debug mode
  *
  */
  isDebug = false

  /**
  * doc
  */
  mainMenu = [
    {
      name: "Charger carte",
      icon: 'download',
      nav: "load"
    },
    {
      name: "Décharger carte",
      icon: 'upload',
      nav: "unload"
    },
    {
      name: 'Gérer persones',
      icon: 'team',
      nav: 'users'
    },
    {
      name: 'Transférer carte',
      icon: 'swap',
      nav: 'transfert'
    },
    {
      name: 'Administrateur',
      icon: 'setting',
      nav: 'admin'
    },
    {
      name: 'À propos',
      icon: 'info-circle',
      nav: 'about',
    },


  ]

  /** app name
  *
  */
  appName = 'acb'

  /**
   *Creates an instance of StaticDataService.
   * @memberof StaticDataService
   */
  constructor() { }
}
