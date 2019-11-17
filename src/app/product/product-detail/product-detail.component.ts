import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/product/product.model';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/shared/cart/cart.model';
import { CartService } from 'src/app/cart/cart.service';

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
  cart: Cart;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.suscription = this.productService.getProduct(this.id)
      .subscribe(prd => {
        this.product = prd;
        this.isLoading = false;
      });
    
    this.cart = await this.cartService.getCart();  
  }

  addToCart() {
    this.cartService.addNewProduct(this.product);
  }
 
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}
