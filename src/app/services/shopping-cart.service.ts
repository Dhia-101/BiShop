import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ThrowStmt } from '@angular/compiler';
import { Product } from '../models/Product';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  private create() {
    return this.db.collection('shopping-cart').add({ dateCreated: new Date().getTime() });
  }


  private getItem(cart: string, prodId: string) {
    return this.db.collection('shopping-cart').doc(cart).collection('items').doc(prodId).get();
  }

  async getCart(product) {
    const cartId = await this.addOrGetCart();
    return this.db.collection('shopping-cart').doc(cartId).collection('items').doc(product.uid).valueChanges();
  }

  // private to keep the api simple
  private async addOrGetCart(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    const result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async addOrRemove(product: Product, n) {
    let cart = await this.addOrGetCart();

    this.getItem(cart, product.uid).pipe(take(1)).subscribe(p => {
      if (p.exists) {
        const increment = firebase.firestore.FieldValue.increment(n);
        this.db.collection('shopping-cart').doc(cart).collection('items').doc(product.uid).update(({ quantity: increment }));
      } else
        this.db.collection('shopping-cart').doc(cart).collection('items').doc(product.uid).set({ uid: product.uid, title: product.title, quantity: 1 });
    });

  }

  async prods() {
    const cartId = await this.addOrGetCart();
    return this.db.collection('shopping-cart').doc(cartId).collection('items').valueChanges();
  }

}
