import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cahotech-monorepo-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  test = [
    {
      title: 'A1',
      description: 'Ich kann mich mit Hilfe von einzelnen Wörtern, kurzen Sätzen, Mimik und Gestik auf einfachste Weise ausdrücken',
      questions: [
        { label: 'jemanden begrüßen und mich vorstellen', value: '',  },
        { label: 'Zahlen, Preisangaben und Uhrzeiten verstehen', value: '' },
        { label: 'Orange', value: '' }
      ]
    }
  ]



  constructor() { }

  ngOnInit (): void {
  }


  testd(){
    console.log(this.test)

  }
}
