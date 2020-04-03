import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  nOfProds: number;
  prods;
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.prods = (await this.cartService.prods());
    this.prods.subscribe(p => {
      this.nOfProds = 0;
      for (var i = 0; i < p.length; i++)
        this.nOfProds += p[i].quantity;
    });
  }

}
