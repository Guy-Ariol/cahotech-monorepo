
export enum landLordView { renter, houses, bill, issue, repair, saldo }

export enum adminView { renter, house, bill, issue, repair, saldo, landlord, home, MoneyIn, MoneyIn2, discount, none }

/** */
export enum homeEnum { Magasin, Appartement, Villa, Studio, Chambre }

/** */
export enum roomTypeEnum { chambre, salon, cuisine, douche, magasin, wc, douche_wc, terrase, jardin, cave, garage }

/** */
export enum roomEquipmentEnum { eau_chaude, detector_fumee, climatisateur, canal_sat }

/** */
export interface roomCostType { Caution: number, 'Tarif mensuel': number, 'Avance Checkin': number, 'Tarif eau': number, 'Tarif électricité': number }

/** */
export interface roomType {
  type: roomTypeEnum,
  surface: number,
  equipment: [],
  cost: roomCostType
}

/** */
export interface homeType {
  name: string,
  // address: string,
  type: homeEnum,
  rooms: roomType[],
  id: string,
  houseId: string
}

/** */
export interface houseType {
  name: string,
  equipment: string[],
  address: string,
  id: string
}
