import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../shared/cart/cart.model';
import { CheckOutService } from '../check-out/check-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  @Input('cart') cart: Cart

  constructor(private checkOutService: CheckOutService,
              private router: Router) { }

  ngOnInit() {
  }

  proceedToCheckOut() {
    this.checkOutService.setCheckOutCart([...this.cart.items]);
    this.router.navigate(['check-out']);
  }

}
