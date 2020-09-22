/** */
// export enum landLordView { renter, houses, bill, issue, repair, saldo, account, home, none }

// export enum renterView { home, bill, issue, repair, saldo, account, none }

/** */
export enum appView { renter, house, bill, issue, repair, saldo, landlord, home, MoneyIn, MoneyIn2, discount, none, config, account, mainMenuClosed, document }

/** */
export enum houseEquipmentEnum { 'Piscine', 'Forage', 'Parking', 'Instincteur', 'Gardienage', 'Ascenceur', 'Vidéo surveillance', 'Groupe électrogène', 'Espace jeux enfants' }

/** */
export enum roomEquipmentEnum { eau_chaude, detector_fumee, climatisateur, canal_sat }

/** */
export enum repairEnum { Maçonnerie, Plomberie, Menuserie, Carrelage }

export interface repairType { department: repairEnum, description: string, doc: string[], cost: number, id: string, timeStamp: number, status: 'En cours' | 'Ouvert' | 'Terminer' }
