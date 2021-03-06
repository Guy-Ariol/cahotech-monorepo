/**
 * doc
 */
export enum userEnum { landlord, renter, client, ceo, worker, admin, superAdmin, technician }

/**
 * doc
 */
export interface userType {
  // common
  /**
  * doc
  */
  lastName: string
  /**
  * doc
  */
  firstName: string,
  /**
  * doc
  */
  id: string,
  /**
  * doc
  */
  tel: string,
  /**
  * doc
  */
  type: userEnum,
  /**
  * doc
  */
  companyName: string,
  /**
  * doc
  */
  logo: string[],
  /**
  * doc
  */
  email: string,
  /**
  * doc
  */
  timeStamp: number,
  /**
   * doc
   */
  emailSent: boolean,
  /**
     * doc
     */
  workers: any, // {workderId : userType}
  /**
   * doc
   */
  adminPass: string,
  /**
   * doc
   */
  gender: string  // Mr or Mne,
  /**
  * doc
  */
  apps: string[],
  /**
    * doc
    */
  cards: cardType,
  /** user's adress */
  addres: string
  /** */
  saldo: number,
  config?: { electricity: number, water: number },


  // chimmo
  landlordId: string
  rentersID: string[]
  housesID: string[]
  homesID: string[]

  // acb
  /**
  * doc
  */
  catalog: any,
  /**
  * doc
  */
  history: historyType[],
  /**
  * doc
  */
  points: any   //{ compagnyId: { list: { catalog: string, points: number, workerID: string, timeStamp: number }[]} },
  /** */
  scanType: 'nfc' | 'barcode'

}

/**
 * doc
 */
export interface historyType {
  /**
  * doc
  */
  points: number,
  /**
  * doc
  */
  workerId: string
}

/**
 * doc
 */
export interface cardType {
  /**
  * doc
  */
  id: { holderId: string }
}

/**
 * doc
 */
export interface sendEmailType {
  /**
  * doc
  */
  email: string,
  /**
  * doc
  */
  type: sendEmailEnum,
  /**
  * doc
  */
  timeStamp: number,
  /**
  * doc
  */
  gender: string,
  /**
   * doc
   */
  name: string,
  /**
  * doc
  */
  pass: string,
  /**
  * doc
  */
  sent: boolean
}

/**
 * doc
 */
export enum sendEmailEnum { newuser, changePass }

/** */
export interface homeType {
  name: string,
  type: homeEnum,
  rooms: roomType[],
  id: string,
  houseId: string,
  cost: roomCostType,
  timeStamp: number,
  landLord: { Id: string, renterId: string }[],
  doc: { title: string, url: string, type: docEnum }[],
  reparations: string[],
  consumption: consumptionType[],
}

/** */
export interface houseType {
  name: string,
  equipment: string[],
  address: string,
  id: string,
  ownerId?: string,
  timeStamp: number,
  homeList?: string[]
}

/** */
export enum homeEnum { Appartement, Studio, Chambre, Commerce }

/** */
export interface roomType {
  type: roomTypeEnum,
  surface: number,
  equipment: []
}

/** */
export enum roomTypeEnum { chambre, salon, cuisine, douche, magasin, wc, douche_wc, terrase, jardin, cave, garage }

/** */
export interface roomCostType { Caution: number, 'Tarif mensuel': number, 'Montant prérequis': number }

/** */
export enum docEnum { "État des lieux", Facture, Contrat }

export interface moneyType { sender: string, worker: string, home?: string, renter?: string, sum: number, source: string, app: string, id: string, timeStamp: number, receiver: string, note: string }

export interface consumptionType { electricity: number, water: number, timeStamp: number, workerId: string, id: string }

export interface billType { timeStamp: number, rent: number, waterDiff: number, electricityDiff: number, receiver: string, home: string, app: string, extra: number, note: string, consumptionId: string,
  waterUnit: number, electricityUnit: number, cable: number, id: string
}
