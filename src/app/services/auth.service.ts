import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  test;
  constructor(
    private db: AngularFirestore,
    private AFAuth: AngularFireAuth) {
    this.test = false;
  }

  getUser() {
    return this.AFAuth.authState;
  }

  isAdmin() {
    return this.getUser()
      .pipe(switchMap(val => {
        return this.db.collection('Users').doc(val.uid).valueChanges();
      }));
    // switchmap switches the observable after changing it qm
  }

  login() {

    this.AFAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

  }

  logout() {
    this.AFAuth.auth.signOut();
  }

  saveUser(val) {
    this.db.collection('Users').add(val);

  }
}
