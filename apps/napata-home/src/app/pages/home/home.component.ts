import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../../../../../libs/service/src/lib/utils/utils.service";

@Component({
  selector: 'cahotech-monorepo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public utilsProv: UtilsService
  ) { }

  ngOnInit(): void {
    console.log(this.utilsProv.isMobile)

  }

}
