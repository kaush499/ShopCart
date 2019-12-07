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

  // gets all products from the database
  ngOnInit() {
    this.productService.getAllProducts()
    .pipe(
      // uses switchmap for using 2 observables 1 for recieving all prd and 
      // 2nd for seeing which category is choosen to filter the prd accordingly
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
