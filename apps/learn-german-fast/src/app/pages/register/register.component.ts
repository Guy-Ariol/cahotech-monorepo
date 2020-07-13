import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'cahotech-monorepo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public utilsProv: UtilsService,

  ) { }

  ngOnInit(): void {
  }

}
