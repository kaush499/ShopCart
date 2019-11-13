import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/product/product.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class ProductService {

    constructor(private http: HttpClient) {}
    
    getProducts() {
        return this.http
        .get<{products: Product[]}>
        ('http://localhost:3000/products')
        .pipe(
            map(response => {
                return response.products;
            })
        );
    }
}