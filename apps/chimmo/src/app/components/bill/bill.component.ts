import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
@Input() item
  constructor() { }

  ngOnInit(): void {
  }

}
