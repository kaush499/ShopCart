import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class UserOrderService {
    userId: number;

    constructor(private http: HttpClient,
                private userService: UserService) {
        this.userId = this.userService.getUserId();
    }

    getAllOrders() {
        return this.http.get<{ orders: Order[] }>
            (`${environment.apiUrl}/orders/user/all/${this.userId}`)
            .pipe( map(response => {
                return response.orders;
            }))
    }
}