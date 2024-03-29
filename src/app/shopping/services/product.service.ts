import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models/product/product.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) {}
    
    // getting all the products
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

    // getting only the single prd from its prdId
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