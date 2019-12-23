import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewOrderService } from '../../services/new-order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/user/models/order.model';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  id: string;
  orders$: Observable<Order[]>;

  constructor(private route: ActivatedRoute,
              private newOrderService: NewOrderService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.orders$ = this.newOrderService.getNewOrders(Number(this.id));
  }

}
