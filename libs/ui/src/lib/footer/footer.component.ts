import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UtilsService } from "libs/service/src/lib/utils/utils.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() version = ''
  visible = false

  constructor(
    public utils: UtilsService,
    private route: Router

  ) { }

  ngOnInit (): void {
  }

  @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utils.setScreenSize(window.innerWidth, window.innerHeight)

    if (window.innerHeight < 400) document.getElementById('footer').style.visibility = "hidden"
    else document.getElementById('footer').style.visibility = "visible"
  }


  openAdmin (): void {
    this.route.navigate(['super-admin'])
    this.visible = false;
  }

  change (value: boolean): void {
    console.log(value);
  }

  openReleasePage () {
    this.route.navigate(['release'])
    this.visible = false;
  }
}
