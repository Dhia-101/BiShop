import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  isAdmin;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private AFAuth: AngularFireAuth) {

  }

  ngAfterViewInit() {
    this.AFAuth.auth.getRedirectResult().then(result => {
      console.log(result);
      if (result.user && result.additionalUserInfo.isNewUser) {
        this.db.collection('Users').add({ email: result.user.email, displayName: result.user.displayName, photoURL: result.user.photoURL, isAdmin: false });
      }
    });

    this.authService.getUser()
      .subscribe(val => {
        this.isAdmin = val;
      });
  }


  loginWithGoogle() {
    this.authService.login();

  }
  logout() {
    this.authService.logout();
  }

  test() {


  }

}
