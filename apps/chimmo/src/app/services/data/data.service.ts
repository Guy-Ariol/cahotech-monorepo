import { Injectable } from '@angular/core';
import { landLordView, adminView } from '../interfaces/interfaces.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mainMenuLandLord

  mainMenuAdmin

  newLandlordForm

  newRenterForm

  spinner = false

  newHomes

  constructor() {

    this.mainMenuLandLord = [
      {
        name: 'Locataires',
        iconOn: 'assets/imgs/account-cash-on.svg',
        iconOff: 'assets/imgs/account-cash.svg',
        nav: landLordView.renter
      },
      {
        name: 'Résidences',
        iconOn: 'assets/imgs/houses-on.svg',
        iconOff: 'assets/imgs/houses.svg',
        nav: landLordView.houses
      },
      {
        name: 'Factures',
        iconOn: 'assets/imgs/cash-register-on.svg',
        iconOff: 'assets/imgs/cash-register.svg',
        nav: landLordView.bill
      },
      {
        name: 'Réclamations',
        iconOn: 'assets/imgs/flash-alert-on.svg',
        iconOff: 'assets/imgs/flash-alert.svg',
        nav: landLordView.issue
      },
      {
        name: 'Réparations',
        iconOn: 'assets/imgs/hammer-on.svg',
        iconOff: 'assets/imgs/hammer.svg',
        nav: landLordView.repair
      },
      {
        name: 'Mon solde',
        iconOn: 'assets/imgs/cash-check-on.svg',
        iconOff: 'assets/imgs/cash-check.svg',
        nav: landLordView.saldo
      }
    ]

    this.mainMenuAdmin = [
      {
        name: 'Bailleurs',
        iconOn: 'assets/imgs/account-tie-on.svg',
        iconOff: 'assets/imgs/account-tie.svg',
        nav: adminView.landlord
      },
      {
        name: 'Locataires',
        iconOn: 'assets/imgs/account-on.svg',
        iconOff: 'assets/imgs/account.svg',
        nav: adminView.renter
      },
      {
        name: 'Résidences',
        iconOn: 'assets/imgs/houses-on.svg',
        iconOff: 'assets/imgs/houses.svg',
        nav: adminView.houses
      },
      {
        name: 'Logements',
        iconOn: 'assets/imgs/home-on.svg',
        iconOff: 'assets/imgs/home.svg',
        nav: adminView.home
      },
      {
        name: 'Bailleur',
        iconOn: 'assets/imgs/cash-register-on.svg',
        iconOff: 'assets/imgs/cash-register.svg',
        nav: adminView.MoneyIn
      },
      {
        name: 'Locataire',
        iconOn: 'assets/imgs/cash-register-on.svg',
        iconOff: 'assets/imgs/cash-register.svg',
        nav: adminView.MoneyIn2
      },
      {
        name: 'Factures',
        iconOn: 'assets/imgs/bill-on.svg',
        iconOff: 'assets/imgs/bill.svg',
        nav: adminView.bill
      },
      {
        name: 'Rémises',
        iconOn: 'assets/imgs/sale-on.svg',
        iconOff: 'assets/imgs/sale.svg',
        nav: adminView.discount
      },
      {
        name: 'Réparations',
        iconOn: 'assets/imgs/hammer-on.svg',
        iconOff: 'assets/imgs/hammer.svg',
        nav: adminView.repair
      }
    ]

    this.newLandlordForm = [
      {
        title: 'Nom*',
        type: 'text',
        value: null,
        index: 0
      },
      {
        title: 'Prénom*',
        type: 'text',
        value: null,
        index: 1
      },
      {
        title: 'Adresse', //TODO rename to address
        type: 'address',
        value: null,
        index: 2,
        id: 'address',
      },
      {
        title: 'E-mail*',
        type: 'email',
        value: null,
        index: 3
      },
      {
        title: 'Tel*',
        type: 'number',
        value: null,
        index: 4
      }
    ]

    this.newRenterForm = [
      {
        title: 'Nom*',
        type: 'text',
        value: null,
        index: 0
      },
      {
        title: 'Prénom*',
        type: 'text',
        value: null,
        index: 1
      },
      {
        title: 'Adresse',
        type: 'text',
        value: null,
        index: 2
      },
      {
        title: 'E-mail*',
        type: 'email',
        value: null,
        index: 3
      },
      {
        title: 'Tel*',
        type: 'number',
        value: null,
        index: 4
      },
      {
        title: 'Contrat*',
        type: 'date-range',
        value: null,
        index: 5
      },
      {
        title: 'Selectioner bailleur',
        type: 'autocomplete',
        value: null,
        index: 6,
      }
    ]

    this.newHomes = [
      {
        title: 'Nom*',
        type: 'date-range',
        value: null,
        index: 5
      },
    ]
  }

}
