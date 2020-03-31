import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  categories$;
  category: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categorieService: CategoryService
  ) {
    productService.getAllData().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
    });
    this.categories$ = categorieService.getCategories();
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = this.products;

    });

  }

  ngOnInit() {

  }


  filter() {
    this.filteredProducts = this.category ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
