import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string

  constructor(
    public route: Location


  ) { }

  ngOnInit (): void {

  }

  goBack () {
    this.route.back()

    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 200);
  }
}
