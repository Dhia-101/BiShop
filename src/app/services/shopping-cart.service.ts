import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../models/Product';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  private create() {
    return this.db.collection('shopping-cart').add({ dateCreated: new Date().getTime(), totalPrice: 0 });
  }


  private getItem(cart: string, prodId: string) {
    return this.db.collection('shopping-cart').doc(cart).collection('items').doc(prodId).get();
  }

  async clearCart() {
    const cartId = await this.addOrGetCart();
    await this.db.collection('shopping-cart').doc(cartId).set({ totalPrice: 0 });
    // take one fixes observable blockage (stuck) problem
    await this.db.collection('shopping-cart').doc(cartId).collection('items').valueChanges().pipe(take(1))
      .subscribe(docs => {
        docs.forEach(p => {
          this.db.collection('shopping-cart')
            .doc(cartId).collection('items')
            .doc(p.uid)
            .update(({ quantity: 0, totalPrice: 0 }));
        });
      });
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
      const incrementPriceTotal = firebase.firestore.FieldValue.increment(product.price * n);
      this.db.collection('shopping-cart').doc(cart).update({ totalPrice: incrementPriceTotal });
      if (p.exists) {
        const increment = firebase.firestore.FieldValue.increment(n);
        const incrementPrice = firebase.firestore.FieldValue.increment(product.price * n);
        this.db.collection('shopping-cart').doc(cart).collection('items').doc(product.uid).update(({ quantity: increment, totalPrice: incrementPrice }));
      } else
        this.db.collection('shopping-cart').doc(cart).collection('items').doc(product.uid).set({ uid: product.uid, imageURL: product.imageURL, price: product.price, title: product.title, quantity: 1, totalPrice: product.price });
    });
  }

  async getTotalPrice() {
    let cart = await this.addOrGetCart();
    return this.db.collection('shopping-cart').doc(cart).valueChanges();
  }



  async prods() {
    const cartId = await this.addOrGetCart();
    return this.db.collection('shopping-cart').doc(cartId).collection('items').valueChanges();
  }

}
