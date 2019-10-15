import { Component, OnInit, Input } from '@angular/core';
// import { Product } from '../../product.model';
// import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  // @Input('productItem') product: Product;

  constructor() { }

  ngOnInit() {
  }

  onAddToCart(index: number){
    // this.product.addedToCart = true;
    // this.productService.addToCart(this.product.id);
  }

}
