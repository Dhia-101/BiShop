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
  prods;
  user;
  isAdmin;


  constructor(private authService: AuthService,
    private cartService: ShoppingCartService) {
    this.user = authService.getUser();

    this.authService.isAdmin()
      .subscribe((val: User) => {
        this.isAdmin = val.isAdmin;
      });
  }


  async ngOnInit() {

    (await this.cartService.prodSum()).subscribe(p => {
      this.prods = 0;
      for (var i = 0; i < p.length; i++)
        this.prods += p[i].quantity;
    });
  }


  logout() {

    this.authService.logout();
  }

  async test() {

  }


}
