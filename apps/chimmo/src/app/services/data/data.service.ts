import { Injectable } from '@angular/core';
import { appView } from '../interfaces/interfaces.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mainMenuLandLord

  mainMenuAdmin

  renterMenu

  landlordMenu

  newLandlordForm

  newRenterForm

  spinner = false

  newHome

  newHouse

  appName = 'chimmo'

  showTopMenu = false

  constructor() {

    this.renterMenu = [
      {
        name: 'Compte',
        iconOn: 'assets/imgs/account-on.svg',
        iconOff: 'assets/imgs/account.svg',
        nav: appView.account
      },
      {
        name: 'logement',
        iconOn: 'assets/imgs/home-on.svg',
        iconOff: 'assets/imgs/home.svg',
        nav: appView.home
      },
      {
        name: 'Factures',
        iconOn: 'assets/imgs/bill-on.svg',
        iconOff: 'assets/imgs/bill.svg',
        nav: appView.bill
      },
      {
        name: 'Solde',
        iconOn: 'assets/imgs/bill-on.svg',
        iconOff: 'assets/imgs/bill.svg',
        nav: appView.bill
      },
      {
        name: 'Réquetes',
        iconOn: 'assets/imgs/bill-on.svg',
        iconOff: 'assets/imgs/bill.svg',
        nav: appView.bill
      },
    ]

    this.landlordMenu = [
      {
        name: 'Compte',
        iconOn: 'assets/imgs/account-tie-on.svg',
        iconOff: 'assets/imgs/account-tie.svg',
        nav: appView.account
      },
      {
        name: 'Résidences',
        iconOn: 'assets/imgs/houses-on.svg',
        iconOff: 'assets/imgs/houses.svg',
        nav: appView.house
      },
      {
        name: 'Locataires',
        iconOn: 'assets/imgs/account-cash-on.svg',
        iconOff: 'assets/imgs/account-cash.svg',
        nav: appView.renter
      },
      {
        name: 'Factures',
        iconOn: 'assets/imgs/bill-on.svg',
        iconOff: 'assets/imgs/bill.svg',
        nav: appView.bill
      },
      {
        name: 'Réparations',
        iconOn: 'assets/imgs/hammer-on.svg',
        iconOff: 'assets/imgs/hammer.svg',
        nav: appView.repair
      },
      {
        name: 'Réquetes',
        iconOn: 'assets/imgs/flash-on.svg',
        iconOff: 'assets/imgs/flash.svg',
        nav: appView.issue
      },
      {
        name: 'Solde',
        iconOn: 'assets/imgs/cash-check-on.svg',
        iconOff: 'assets/imgs/cash-check.svg',
        nav: appView.saldo
      },

    ]

    this.mainMenuLandLord = [
      {
        name: 'Locataires',
        iconOn: 'assets/imgs/account-cash-on.svg',
        iconOff: 'assets/imgs/account-cash.svg',
        nav: appView.renter
      },
      {
        name: 'Résidences',
        iconOn: 'assets/imgs/houses-on.svg',
        iconOff: 'assets/imgs/houses.svg',
        nav: appView.house
      },
      {
        name: 'Factures',
        iconOn: 'assets/imgs/cash-register-on.svg',
        iconOff: 'assets/imgs/cash-register.svg',
        nav: appView.bill
      },
      {
        name: 'Réclamations',
        iconOn: 'assets/imgs/flash-alert-on.svg',
        iconOff: 'assets/imgs/flash-alert.svg',
        nav: appView.issue
      },
      {
        name: 'Réparations',
        iconOn: 'assets/imgs/hammer-on.svg',
        iconOff: 'assets/imgs/hammer.svg',
        nav: appView.repair
      },
      {
        name: 'Mon solde',
        iconOn: 'assets/imgs/cash-check-on.svg',
        iconOff: 'assets/imgs/cash-check.svg',
        nav: appView.saldo
      }
    ]

    this.mainMenuAdmin = [
      {
        name: 'Bailleurs',
        iconOn: 'assets/imgs/account-tie-on.svg',
        iconOff: 'assets/imgs/account-tie.svg',
        nav: appView.landlord
      },
      {
        name: 'Locataires',
        iconOn: 'assets/imgs/account-on.svg',
        iconOff: 'assets/imgs/account.svg',
        nav: appView.renter
      },
      {
        name: 'Résidences',
        iconOn: 'assets/imgs/houses-on.svg',
        iconOff: 'assets/imgs/houses.svg',
        nav: appView.house
      },
      {
        name: 'Logements',
        iconOn: 'assets/imgs/home-on.svg',
        iconOff: 'assets/imgs/home.svg',
        nav: appView.home
      },
      {
        name: 'Bailleur',
        iconOn: 'assets/imgs/cash-register-on.svg',
        iconOff: 'assets/imgs/cash-register.svg',
        nav: appView.MoneyIn
      },
      {
        name: 'Locataire',
        iconOn: 'assets/imgs/cash-register-on.svg',
        iconOff: 'assets/imgs/cash-register.svg',
        nav: appView.MoneyIn2
      },
      {
        name: 'Factures',
        iconOn: 'assets/imgs/bill-on.svg',
        iconOff: 'assets/imgs/bill.svg',
        nav: appView.bill
      },
      {
        name: 'Rémises',
        iconOn: 'assets/imgs/sale-on.svg',
        iconOff: 'assets/imgs/sale.svg',
        nav: appView.discount
      },
      {
        name: 'Réparations',
        iconOn: 'assets/imgs/hammer-on.svg',
        iconOff: 'assets/imgs/hammer.svg',
        nav: appView.repair
      },
      {
        name: 'Config',
        iconOn: 'assets/imgs/setting-on.svg',
        iconOff: 'assets/imgs/setting.svg',
        nav: appView.config
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
      },
      {
        title: 'Contrat*',
        type: 'date-range',
        value: null,
        index: 5
      },
      {
        title: 'Logement*',
        type: 'autocomplete',
        value: null,
        index: 6,
      },
      {
        title: 'Bailleur*',
        type: 'autocomplete2',
        value: null,
        index: 7,
      }
    ]

    this.newHome = [
      {
        title: 'Nom*',
        type: 'text',
        value: null,
        index: 0
      },
      {
        title: 'Type de logement*',
        type: 'autocomplete',
        value: null,
        index: 1
      },
      {
        title: 'Résidence*',
        type: 'autocomplete2',
        value: null,
        index: 2
      },
      {
        title: 'Bailleur*',
        type: 'autocomplete3',
        value: null,
        index: 3,
      },
      {
        title: 'Caution*',
        type: 'number',
        value: null,
        index: 4
      },
      {
        title: 'Tarif mensuel*',
        type: 'number',
        value: null,
        index: 5
      },
      {
        title: 'Avance Checkin*',
        type: 'number',
        value: null,
        index: 6
      },
      {
        title: 'Pièces*',
        type: 'complex',
        value: 0,
        index: 7
      },
    ]

    this.newHouse = [
      {
        title: 'Nom*',
        type: 'text',
        value: null,
        index: 0
      },
      {
        title: 'Équipements*',
        type: 'checkbox-group',
        value: null,
        index: 1
      },
      {
        title: 'Adresse',
        type: 'address',
        value: null,
        index: 2,
        id: 'address',
      },
      {
        title: 'Proprietaire*',
        type: 'autocomplete',
        value: null,
        index: 3,
      }
    ]
  }

}
