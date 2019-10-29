import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/product/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  items: Product[];
  itemCount: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getAll();
    this.subscription = this.productService.getProductsUpdated()
    .subscribe(products => {
      this.products = products;
      this.items = this.products;
    });
    this.items = this.products;
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
