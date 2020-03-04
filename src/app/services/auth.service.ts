import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFAuth: AngularFireAuth) { }

  getUser() {
    return this.AFAuth.authState;
  }

  login() {
    this.AFAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(val => {
        console.log(val);
      });
  }

  logout() {
    this.AFAuth.auth.signOut();
  }
}
