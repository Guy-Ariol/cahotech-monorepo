import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'cahotech-monorepo-test',
  templateUrl: './fast-test.component.html',
  styleUrls: ['./fast-test.component.scss']
})
export class TestComponent implements OnInit {

  test = [
    {
      title: 'A1',
      description: 'Ich kann mich mit Hilfe von einzelnen Wörtern, kurzen Sätzen, Mimik und Gestik auf einfachste Weise ausdrücken',
      questions: [
        { label: 'Jemanden begrüßen und mich vorstellen', value: '', },
        { label: 'Einfache Fragen stellen und beantworten', value: '' },
        { label: 'Zahlen, Preisangaben und Uhrzeiten verstehen', value: '' },
        { label: 'Eine kurte Notiz schreiben', value: '' },
        { label: 'Auf Schilder, Plakaten und Wegweisern einiges verstehen', value: '' },

      ]
    },
    {
      title: 'A2',
      description: 'Ich kann mich im Alltag zurechtfinden, obwohl ich noch viele Fehler mache',
      questions: [
        { label: 'Etwas zum Essen und Trinken bestellen', value: '' },
        { label: 'In einer Zeitung bestimmte Informationen finden', value: '' },
        { label: 'Nach dem Weg fragen', value: '' },
        { label: 'Eine Postkarte schreiben', value: '' },
        { label: 'Eine kurze Ansage, wie z.B. im Flughafen verstehen', value: '' },
      ]
    },
    {
      title: 'B1',
      description: 'Ich kann mich in den meisten Alltagsstuationen ganz gut, aber noch mit Fehelern, verständigen',
      questions: [
        { label: 'Einfache Gespräche über vertraute Themen führen', value: '' },
        { label: 'Eine Telefonnachricht verstehen', value: '' },
        { label: 'Persänliche Briefe schreiben', value: '' },
        { label: 'Einen einfachen Zeitungsartikel verstehen', value: '' },
        { label: 'Mich im Ausland in de Regel gut verständigen' }
      ]
    },
    {
      title: 'B2',
      description: 'Ich kann in verschiedenen Situationen mühelos einfache Gespräche führen. Man versteht mich problemlos, jedoch mache ich einige Fehler',
      questions: [
        { label: 'Mich aktiv na längeren Gesprächen beteiligen', value: '' },
        { label: 'Einer Nachrichtensendung im Fernsehen folgen', value: '' },
        { label: 'Fachbezogene Korrespondenz lesen', value: '' },
        { label: 'In Diskussionen meine Ansichten begründen', value: '' },
      ]
    },
    {
      title: 'C1',
      description: 'Ich kann mich in unerwarteten Situationen zurechtfinden und drücke mich fast immer deutlich und weitestgehend korrekt aus',
      questions: [
        { label: 'Mit Muttersprachlern über anspruchsvole Themen diskutieren', value: '' },
        { label: 'Komplexe Sachverhalte darstellen', value: '' },
        { label: 'Berichte und Briefe aller Art schreiben', value: '' },
        { label: 'Den meisten Fernsehsendungen problemlos folgen', value: '' },
        { label: 'zeitungen, Fachzeitschriften und Literatur lesen' }
      ]
    }, {
      title: 'C2',
      description: 'Ich kann mich in allen Situationen annährend wie ein/e Muttersprachler/-in ausdrücken',
      questions: [
        { label: 'Fließend sprechen und auch feinere Bedeutungsnuancen ausdrücken', value: '' },
        { label: 'Mich nühelos an allen Gesprächen mit Muttersprachlern beteiligen', value: '' },
        { label: 'Anspruchsvolle Texte aller Art schreiben', value: '' },
        { label: 'Literatur- und Sachbücher lesen', value: '' },
        { label: 'Ohne Schwierigkeiten auch schnell gesprochene Sprache verstehen' }
      ]
    }
  ]


  constructor(

    public utilsProv: UtilsService

  ) { }

  ngOnInit (): void {
  }


  testd () {
    console.log(this.test)

  }
}
