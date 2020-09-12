import { Component } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent  {

  constructor(
    public utils: UtilsService,
  ) { }

}
