export enum userEnum { landlord, renter }

export interface userType {
  type: userEnum,
  firstName: string,
  lastName: string,
  email: string,
  addres: { country: string, city: string, discrict: string },
  tel: number

}
