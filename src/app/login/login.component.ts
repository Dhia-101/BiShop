import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(
    private db: AngularFirestore,
    private authService: AuthService) {

  }

  loginWithGoogle() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  test() {
    this.authService.getUser()
      .subscribe(val => {
        console.log(val);
      });
  }

}
