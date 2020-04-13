import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFirestore,
    private shoppingCartService: ShoppingCartService) { }

  create(order) {
    const result = this.db.collection('orders').add(order);
    this.shoppingCartService.clearCart();
    // store then clear
    return result;
  }

  getOrders() {
    return this.db.collection('orders').valueChanges();
  }

  getOrdersById(id) {
    return this.db.collection('orders', ref => ref.where('userId', '==', id)).valueChanges();
  }
  // private methods inaccesible from anywhere expect this class qm
}
