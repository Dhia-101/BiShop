import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  categories$;
  constructor(private productService: ProductService, private categorieService: CategoryService) {
    this.products$ = productService.getAllData();
    this.categories$ = categorieService.getCategories();
  }

  ngOnInit() {
  }

}
