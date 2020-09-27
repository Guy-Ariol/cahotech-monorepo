import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'cahotech-monorepo-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  constructor(
    public utilsProv: UtilsService,

  ) { }

  ngOnInit(): void {
  }


  goback(){
    history.back()

  }
}
