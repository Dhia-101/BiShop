import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product;
  quantity: any;

  constructor(private cartService: ShoppingCartService) { }


  async ngOnInit() {
    (await this.cartService.getCart(this.product))
      .subscribe((p: any) => {
        this.quantity = p.quantity ? p.quantity : 0;
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}