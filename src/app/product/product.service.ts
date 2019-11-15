import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/product/product.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class ProductService {

    constructor(private http: HttpClient) {}
    
    getAllProducts() {
        return this.http
        .get<{products: Product[]}>
        ('http://localhost:3000/products')
        .pipe(
            map(response => {
                return response.products;
            })
        );
    }

    getProduct(id: string) {   
        return this.http
        .get<{ product: Product }>(`http://localhost:3000/products/${id}`)
        .pipe(
            map(response => {
                //console.log(response);
                return response.product;
            })
        )
    } 
}