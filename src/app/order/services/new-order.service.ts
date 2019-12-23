import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/user/models/order.model';

@Injectable({providedIn: "root"})
export class NewOrderService {

    constructor(private http: HttpClient) {}

    getNewOrders(transactionId: number) {
        return this.http.get<{ orders: Order[] }>
            (`${environment.apiUrl}/orders/user/new/${transactionId}`)
            .pipe( map(response => {
                return response.orders;
            }))
    }
}