import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product) {
    const uid = uuidv4();
    this.db.doc('/Products/' + uid).set({ id: uid, product });
  }

  getAllData() {
    return this.db.collection('Products').valueChanges();
  }

}
