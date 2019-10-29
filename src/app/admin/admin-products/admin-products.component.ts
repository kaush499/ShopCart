import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

    constructor(private productService: ProductService) {}

    ngOnInit() {
      console.log("inside admin prd");
      this.productService.initialiseProducts();
    }
 
}
