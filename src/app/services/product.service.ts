import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product) {
    this.db.collection('Products').add(product);
  }

  getAllData() {
    return this.db.collection('Products').valueChanges();
  }
  getAllId() {
    return this.db.collection('Products').snapshotChanges();
  }
}
