import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


export class NavBarComponent {

  user;
  isAdmin;


  constructor(private authService: AuthService) {
    this.user = authService.getUser();

    this.authService.isAdmin()
      .subscribe((val: User) => {
        this.isAdmin = val.isAdmin;
      });

  }



  logout() {

    this.authService.logout();
  }


}
