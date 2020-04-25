import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


export class NavBarComponent implements OnInit {
  user;
  isAdmin;
  nOfProds: number;
  public isMenuCollapsed = true;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {
    this.user = authService.getUser();
    this.authService.isAdmin()
      .subscribe((val: User) => {
        this.isAdmin = val.isAdmin;
      });
  }


  async ngOnInit() {
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


  logout() {
    this.authService.logout();
  }
}
