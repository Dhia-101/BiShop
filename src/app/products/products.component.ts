import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[];
  filteredProducts: Product[];


  category: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
    // if constructor takes too many arguments or too many imports non 
    // top that's a sign(class doing to many thigs qm) you need to brake it into smaller components qm
  ) {
    productService.getAllData().pipe(switchMap((products: Product[]) => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = this.category ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
    // 2async operation , depends on which one completes first can cause error
    // subscription in suubscription to ensure one executes after the other qm
  }
}
