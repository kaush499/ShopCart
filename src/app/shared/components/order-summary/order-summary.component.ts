import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart/cart.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  @Input('cart') cart: Cart

  constructor() { }

  ngOnInit() {
  }

}
