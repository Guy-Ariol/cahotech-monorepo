import { Injectable } from '@angular/core';

const langFr: langType = {
  expr1: 'langue',
  expr2: 'Choisir le niveau souhaité',
  expr3: '',
  expr4: '',
  expr5: '',
  expr6: '',
  expr7: '',
  expr8: '',
  expr9: '',
  expr10: '',
  expr11: '',
  expr12: '',
  expr13: '',
  expr14: '',
  expr15: '',
  expr16: '',
  expr17: '',
  expr18: '',
  expr19: '',
  expr20: '',
  expr21: '',
  expr22: '',
  expr23: '',
  expr24: '',
  expr25: '',
  expr26: '',
  expr27: '',
  expr28: '',
  expr29: '',
  expr30: '',
  expr31: '',
  expr32: '',
  expr33: '',
  expr34: '',
  expr35: '',
  expr36: '',
  expr37: '',
  expr38: '',
  expr39: '',
  expr40: '',
  expr41: '',
  expr42: '',
  expr43: '',
  expr44: '',
  expr45: '',
  expr46: '',
  expr47: '',
  expr48: '',
  expr49: '',
  expr50: '',
  expr51: '',
  expr52: '',
  expr53: '',
  expr54: '',
  expr55: '',
  expr56: '',
  expr57: '',
  expr58: '',
  expr59: '',
  expr60: '',
  expr61: '',
  expr62: '',
  expr63: '',
  expr64: '',
  expr65: '',
  expr66: '',
  expr67: '',
  expr68: '',
  expr69: '',
  expr70: '',
  expr71: '',
  expr72: '',
  expr73: '',
  expr74: '',
  expr75: '',
  expr76: '',
  expr77: '',
  expr78: '',
  expr79: '',
  expr80: '',
  expr81: '',
  expr82: '',
  expr83: '',
  expr84: '',
  expr85: '',
  expr86: '',
  expr87: '',
  expr88: '',
  expr89: '',
  expr90: '',
  expr91: '',
  expr92: '',
  expr93: '',
  expr94: '',
  expr95: '',
  expr96: '',
  expr97: '',
  expr98: '',
  expr99: '',

}

const langEn: langType = {
  expr1: 'language',
  expr2: 'Select the target level',
  expr3: '',
  expr4: '',
  expr5: '',
  expr6: '',
  expr7: '',
  expr8: '',
  expr9: '',
  expr10: '',
  expr11: '',
  expr12: '',
  expr13: '',
  expr14: '',
  expr15: '',
  expr16: '',
  expr17: '',
  expr18: '',
  expr19: '',
  expr20: '',
  expr21: '',
  expr22: '',
  expr23: '',
  expr24: '',
  expr25: '',
  expr26: '',
  expr27: '',
  expr28: '',
  expr29: '',
  expr30: '',
  expr31: '',
  expr32: '',
  expr33: '',
  expr34: '',
  expr35: '',
  expr36: '',
  expr37: '',
  expr38: '',
  expr39: '',
  expr40: '',
  expr41: '',
  expr42: '',
  expr43: '',
  expr44: '',
  expr45: '',
  expr46: '',
  expr47: '',
  expr48: '',
  expr49: '',
  expr50: '',
  expr51: '',
  expr52: '',
  expr53: '',
  expr54: '',
  expr55: '',
  expr56: '',
  expr57: '',
  expr58: '',
  expr59: '',
  expr60: '',
  expr61: '',
  expr62: '',
  expr63: '',
  expr64: '',
  expr65: '',
  expr66: '',
  expr67: '',
  expr68: '',
  expr69: '',
  expr70: '',
  expr71: '',
  expr72: '',
  expr73: '',
  expr74: '',
  expr75: '',
  expr76: '',
  expr77: '',
  expr78: '',
  expr79: '',
  expr80: '',
  expr81: '',
  expr82: '',
  expr83: '',
  expr84: '',
  expr85: '',
  expr86: '',
  expr87: '',
  expr88: '',
  expr89: '',
  expr90: '',
  expr91: '',
  expr92: '',
  expr93: '',
  expr94: '',
  expr95: '',
  expr96: '',
  expr97: '',
  expr98: '',
  expr99: '',

}

const langDe: langType = {
  expr1: 'Sprache',
  expr2: 'Gewünschtes Niveau auswählen',
  expr3: '',
  expr4: '',
  expr5: '',
  expr6: '',
  expr7: '',
  expr8: '',
  expr9: '',
  expr10: '',
  expr11: '',
  expr12: '',
  expr13: '',
  expr14: '',
  expr15: '',
  expr16: '',
  expr17: '',
  expr18: '',
  expr19: '',
  expr20: '',
  expr21: '',
  expr22: '',
  expr23: '',
  expr24: '',
  expr25: '',
  expr26: '',
  expr27: '',
  expr28: '',
  expr29: '',
  expr30: '',
  expr31: '',
  expr32: '',
  expr33: '',
  expr34: '',
  expr35: '',
  expr36: '',
  expr37: '',
  expr38: '',
  expr39: '',
  expr40: '',
  expr41: '',
  expr42: '',
  expr43: '',
  expr44: '',
  expr45: '',
  expr46: '',
  expr47: '',
  expr48: '',
  expr49: '',
  expr50: '',
  expr51: '',
  expr52: '',
  expr53: '',
  expr54: '',
  expr55: '',
  expr56: '',
  expr57: '',
  expr58: '',
  expr59: '',
  expr60: '',
  expr61: '',
  expr62: '',
  expr63: '',
  expr64: '',
  expr65: '',
  expr66: '',
  expr67: '',
  expr68: '',
  expr69: '',
  expr70: '',
  expr71: '',
  expr72: '',
  expr73: '',
  expr74: '',
  expr75: '',
  expr76: '',
  expr77: '',
  expr78: '',
  expr79: '',
  expr80: '',
  expr81: '',
  expr82: '',
  expr83: '',
  expr84: '',
  expr85: '',
  expr86: '',
  expr87: '',
  expr88: '',
  expr89: '',
  expr90: '',
  expr91: '',
  expr92: '',
  expr93: '',
  expr94: '',
  expr95: '',
  expr96: '',
  expr97: '',
  expr98: '',
  expr99: '',

}

interface langType {
  expr1: string
  expr2: string
  expr3: string
  expr4: string
  expr5: string
  expr6: string
  expr7: string
  expr8: string
  expr9: string
  expr10: string
  expr11: string
  expr12: string
  expr13: string
  expr14: string
  expr15: string
  expr16: string
  expr17: string
  expr18: string
  expr19: string
  expr20: string
  expr21: string
  expr22: string
  expr23: string
  expr24: string
  expr25: string
  expr26: string
  expr27: string
  expr28: string
  expr29: string
  expr30: string
  expr31: string
  expr32: string
  expr33: string
  expr34: string
  expr35: string
  expr36: string
  expr37: string
  expr38: string
  expr39: string
  expr40: string
  expr41: string
  expr42: string
  expr43: string
  expr44: string
  expr45: string
  expr46: string
  expr47: string
  expr48: string
  expr49: string
  expr50: string
  expr51: string
  expr52: string
  expr53: string
  expr54: string
  expr55: string
  expr56: string
  expr57: string
  expr58: string
  expr59: string
  expr60: string
  expr61: string
  expr62: string
  expr63: string
  expr64: string
  expr65: string
  expr66: string
  expr67: string
  expr68: string
  expr69: string
  expr70: string
  expr71: string
  expr72: string
  expr73: string
  expr74: string
  expr75: string
  expr76: string
  expr77: string
  expr78: string
  expr79: string
  expr80: string
  expr81: string
  expr82: string
  expr83: string
  expr84: string
  expr85: string
  expr86: string
  expr87: string
  expr88: string
  expr89: string
  expr90: string
  expr91: string
  expr92: string
  expr93: string
  expr94: string
  expr95: string
  expr96: string
  expr97: string
  expr98: string
  expr99: string


}


@Injectable({
  providedIn: 'root'
})
export class LangService {

  lang: langType = langDe

  constructor() { }

  changeLanguage (lang: 'fr' | 'de' | 'en') {
    if (lang == 'fr') this.lang = langFr
    else if (lang == 'de') this.lang = langDe
    else if (lang == 'en') this.lang = langEn
  }
}
