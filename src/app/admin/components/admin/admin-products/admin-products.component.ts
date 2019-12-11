import { Component, OnInit } from '@angular/core';
import { AdminProuctService } from 'src/app/admin/services/admin-product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

// this component is  only for initialising all products before going to the product list
export class AdminProductsComponent implements OnInit {

    constructor(private productService: AdminProuctService) {}

    ngOnInit() {
      this.productService.initialiseProducts();
    }
 
}
