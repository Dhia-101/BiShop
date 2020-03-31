import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
// take closes the subscription automatically after taking a(decided number of values) value
// another way to close the subscription is to use on destroy interface qm

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  prod;
  // initialize async items qm
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getCategories();
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProd(id).pipe(take(1)).subscribe(p => {
        // unsubscribe after from this subscription?
        this.prod = p;
      });
    }
  }
  // start upper case new name and class name start upper case qm
  ngOnInit() { }

  save(product) {
    if (this.prod) {
      this.productService.update(this.prod.uid, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }


  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.prod.uid);
    // when deleting something always give confirmation qm
    this.router.navigate(['/admin/products']);
  }


}
