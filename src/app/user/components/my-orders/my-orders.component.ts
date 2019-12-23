import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { UserOrderService } from '../../services/user-order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit  {
  orders$: Observable<Order[]>;

  constructor(private userOrderService: UserOrderService) { }

  ngOnInit() {
    console.log("wgg");
    this.orders$ = this.userOrderService.getAllOrders();
  }


}
