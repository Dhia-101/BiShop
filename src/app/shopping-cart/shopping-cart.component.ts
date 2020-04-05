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
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    (await this.cartService.prods())
      .subscribe(p => {
        this.prods = p.filter(p2 => p2.quantity !== 0);
      });
    await this.getTotalProd();

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

}
