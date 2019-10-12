import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class ProductService {
    private products: Product[];
    private productsUpdated = new Subject<Product[]>();

    constructor(private http: HttpClient) {}


    getProductsUpdated() {
        return this.productsUpdated.asObservable();
    }


    getAll() {
        this.http
        .get<{product: Product[]}>
        ("http://localhost:3000/products")
        .subscribe(response => {
            this.products = response.product;
            this.productsUpdated.next([...this.products]);
        });
    }
}