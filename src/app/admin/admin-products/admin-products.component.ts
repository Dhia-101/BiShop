import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  

  // dollar per convention qm
  constructor(private productService: ProductService) {
    // this.products$ = zip(this.productService.getAllData(), this.productService.getAllId());
    this.subscription = productService.getAllData()
      .subscribe((product: Product[]) => {
        // define the type here also if type error, helps ts compiler with type checking qm
        this.products = product;
        this.filteredProducts = product;
      });

  }

  // in coding your now decisions impact later diffculty and troubles qm
  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  Filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => {
        return p.title.toLowerCase().includes(query.toLowerCase());
      }
      ) :
      this.products;
  }

  // print the variables to check if there is soemthign wrong with them at a defined point of time qm


}
