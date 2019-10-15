import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { Product } from '../product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // products: Product[];
  suscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.productService.setProducts();
    // this.suscription = this.productService.getProductsChange()
    //   .subscribe((products: Product[]) => {
    //     this.products = products;
    //   })
  }
}
