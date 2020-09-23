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

export interface repairType { department: repairEnum, description: string, doc: string[], cost: number, id: string, timeStamp: number, status: 'processing' | 'warning' | 'success' | 'error' }

export interface requestType { reporterId: string, description: string, timeStamp: number, type: any, id: string, status: 'processing' | 'warning' | 'success' | 'error' }

export enum paymentSourceEnum {'Cash', 'Mobile Money', 'Dépôt bancaire'}

export interface moneyType { sender: string, worker: string, home?: string, renter?: string, sum: string, source: string, app: string, id: string, timeStamp: number, receiver: string }
