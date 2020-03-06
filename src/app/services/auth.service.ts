import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private db: AngularFirestore,
    private AFAuth: AngularFireAuth) { }

  getUser() {
    return this.AFAuth.authState;
  }

  login() {
    this.AFAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())
      .then(val => {
        this.db.collection('Users').add({ test: 'sdfsf' });
      });
  }

  logout() {
    this.AFAuth.auth.signOut();
  }

}
