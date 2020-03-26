import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { merge, zip, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$;
  ids$;
  // dollar per convention qm
  constructor(private productService: ProductService) {
    // this.products$ = zip(this.productService.getAllData(), this.productService.getAllId());
    this.products$ = productService.getAllData();
  }

  ngOnInit() { }



}
