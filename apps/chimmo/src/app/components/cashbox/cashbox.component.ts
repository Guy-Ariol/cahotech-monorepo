import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cashbox',
  templateUrl: './cashbox.component.html',
  styleUrls: ['./cashbox.component.scss']
})
export class CashboxComponent implements OnInit {
  @Input() trans

  constructor() { }

  ngOnInit (): void {
  }

}
