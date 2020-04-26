import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product;
  @Input('quantity') quantity;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addOrRemove(this.product, 1);
    this.quantity++;
  }

  removeFromCart() {
    this.cartService.addOrRemove(this.product, -1);
    this.quantity--;
  }

}