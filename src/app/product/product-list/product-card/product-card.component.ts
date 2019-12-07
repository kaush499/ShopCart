import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/product/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

// this component contains the product card 
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;

  constructor() { }

  ngOnInit() {
  }

}
