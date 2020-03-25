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
        this.db.doc('Users/' + result.user.uid).set({ email: result.user.email, displayName: result.user.displayName, photoURL: result.user.photoURL, isAdmin: false });
      }
    });


  }


  loginWithGoogle() {
    this.authService.login();

  }
  logout() {
    this.authService.logout();
  }

  test() {
    // this.authService.getUser()
    //   .subscribe(val => {
    //     this.db.collection('Users').doc(val.uid).valueChanges().subscribe(val2 => {
    //       console.log(val2);
    //     });
    //   });
    this.authService.isAdmin().subscribe(val => { console.log(val); });
  }

}
