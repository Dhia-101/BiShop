import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  user;

  constructor(private authService: AuthService) {
    authService.getUser()
      .subscribe(val => {
        this.user = val;
      });
  }
}
