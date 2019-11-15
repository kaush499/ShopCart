import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/product/product.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  id: string;
  product: Product;
  suscription: Subscription;
  isLoading: boolean = true;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.suscription = this.productService.getProduct(this.id)
      .subscribe(prd => {
        this.product = prd;
        this.isLoading = false;
      })
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }


}
