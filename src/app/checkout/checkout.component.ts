import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  nOfProds;
  prods;
  totalPrice;
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    const val = (await this.cartService.prods());
    val.subscribe(products => {
      // variable modifying scope
      this.nOfProds = 0;
      for (let product of products)
        this.nOfProds += product.quantity;
    });

    (await this.cartService.prods())
      .subscribe(p => {
        this.prods = p.filter(p2 => p2.quantity !== 0);
      });

    (await this.cartService.getTotalPrice())
      .subscribe(price => {
        this.totalPrice = price;
      });
  }

  placeOrder(shippingForm) {
    console.log(shippingForm);
  }

}
