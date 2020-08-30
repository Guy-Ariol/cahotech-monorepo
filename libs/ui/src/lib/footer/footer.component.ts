import { Component, OnInit, HostListener } from '@angular/core';
import { UtilsService } from "libs/service/src/lib/utils/utils.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public utils: UtilsService,

  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utils.setScreenSize(window.innerWidth, window.innerHeight)

    if (window.innerHeight < 400) document.getElementById('footer').style.visibility = "hidden"
    else document.getElementById('footer').style.visibility = "visible"
  }

}
