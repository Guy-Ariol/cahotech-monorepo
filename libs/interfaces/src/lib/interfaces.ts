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


  // chimmo
  landlordId: string
  renters: {}
  houses: string[]

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


