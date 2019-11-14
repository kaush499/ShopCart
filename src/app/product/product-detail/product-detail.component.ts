import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/product/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string;
  product$: Observable<Product>;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("ggg");
    this.id = this.route.snapshot.paramMap.get('id');
    this.product$ = this.productService.getProduct(this.id);
  }


}
