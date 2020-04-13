import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  nOfProds;
  prods;
  totalPrice;
  userId;
  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

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

    this.authService.getUser()
      .subscribe(p => this.userId = p);
  }

  ngOnDestroy() {

  }

  placeOrder(shippingForm) {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: shippingForm,
      items: this.prods,
      totalPrice: this.totalPrice,
      userId: this.userId.uid,
      userName: this.userId.displayName
    };
    this.orderService.create(order);
    this.router.navigate(['/order-success', this.userId.uid]);
  }

}
