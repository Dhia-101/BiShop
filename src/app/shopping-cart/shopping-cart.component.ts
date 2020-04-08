import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  nOfProds;
  prods;
  totalPrice;
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    (await this.cartService.prods())
      .subscribe(p => {
        this.prods = p.filter(p2 => p2.quantity !== 0);
      });
    await this.getTotalProd();

    (await this.cartService.getTotalPrice())
      .subscribe(price => {
        this.totalPrice = price;
      });
  }

  async getTotalProd() {
    const val = (await this.cartService.prods());
    val.subscribe(products => {
      // variable modifying scope
      this.nOfProds = 0;
      for (let product of products)
        this.nOfProds += product.quantity;
    });
  }
  async test() {
    (await this.cartService.prods()).subscribe(p => console.log(p));
  }

  async clearCart() {
    await this.cartService.clearCart();
  }

}
