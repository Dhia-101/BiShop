import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }
  // start upper case new name and class name start upper case qm
  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }


}
