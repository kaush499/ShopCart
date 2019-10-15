import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class ProductService {
    private products: Product[] = [];
    private productsUpdated = new Subject<Product[]>();

    constructor(private http: HttpClient,
                private router: Router) {}


    getProductsUpdated() {
        return this.productsUpdated.asObservable();
    }

    getProducts() {
        if(this.products){
            return [...this.products];
        }else {
            this.router.navigate(['../']);
        }
    }

    getProductById(id: number){
        if(this.products){
            return this.products.find(prd => {
                return prd.productId == id;
            });
        }else {
            this.router.navigate(['../']);
        }
        
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

    addProduct(product) {
        const newProduct = {
            title: product.title,
            imagePath: product.imageUrl,
            category: Number(product.category),
            price: product.price
        };
        console.log(newProduct);
        this.http
        .post<{productId: number}>
        ('http://localhost:3000/products', {newProduct: newProduct})
        .subscribe(response => {
             this.products.push({
                title: product.title,
                imagePath: product.imagePath,
                category: product.categoryName,
                price: product.price,
                productId: response.productId
             });
        }, err => {
            console.log(err);
        }, () => {
            this.router.navigate(['/admin/products']);
        })
    }
}