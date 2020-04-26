import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product;
  @Output() minus = new EventEmitter();
  quantity: number = 1;

  constructor(private cartService: ShoppingCartService) { }


  async ngOnInit() {
    this.check();
  }


  async check() {
    (await this.cartService.getCart(this.product))
      .subscribe((p: any) => {
        this.quantity = p.quantity ? p.quantity : 0;
      });
  }

  addToCart() {
    this.cartService.addOrRemove(this.product, 1);
    this.quantity++;
  }

  removeFromCart() {
    this.cartService.addOrRemove(this.product, -1);
    this.minus.emit();
    this.quantity--;
  }

}