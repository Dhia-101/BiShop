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
    // random id generator qm
    this.db.doc('/Products/' + uid).set({
      uid,
      title: product.title,
      price: product.price,
      category: product.category,
      imageURL: product.imageURL


    });
  }

  getAllData() {
    return this.db.collection('Products').valueChanges();
  }

  getProd(productId) {
    return this.db.doc('/Products/' + productId).valueChanges();
  }

  update(uid, product) {
    this.db.doc('/Products/' + uid).set({
      uid,
      title: product.title,
      price: product.price,
      category: product.category,
      imageURL: product.imageURL


    });
  }

  delete(id) {
    this.db.doc('/Products/' + id).delete();
  }

}
