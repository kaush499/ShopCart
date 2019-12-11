import { Component, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
import { Cart } from '../../../shared/models/cart/cart.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart: Cart

  constructor(private checkOutService: CheckOutService) { }

  ngOnInit() {
    this.cart = this.checkOutService.getCart();
  }

}
