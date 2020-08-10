import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UsersService } from '../../services/users/users.service';
import { UserService } from "libs/service/src/lib/user/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'cahotech-monorepo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public utilsProv: UtilsService,
    public userProv: UsersService,
    public userLib: UserService,
    private router: Router

  ) { }

  ngOnInit (): void {

  }


  onLogIn (route) {
    this.router.navigate([route])
  }
}
