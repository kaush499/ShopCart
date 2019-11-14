import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/product/product.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  category: string;
  filterProducts: Product[] = [];

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.productService.getAllProducts()
    .pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    )
    .subscribe(params => {
        this.category = params.get('category');
  
        this.filterProducts = (this.category) ?
          this.products.filter(p => p.categoryName === this.category) : this.products;
      })
    
  }
}
