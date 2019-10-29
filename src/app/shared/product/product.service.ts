import { Injectable, OnInit } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class ProductService {
    private prdInitialised: boolean = false;
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
        if(this.products.length !== 0){
            return this.products.find(prd => {
                return prd.productId == id;
            });
        }else {
            this.router.navigate(['../']);
        }
        
    }

    initialiseProducts() {
        if(!this.prdInitialised){
            this.http
            .get<{product: Product[]}>
            ("http://localhost:3000/products")
            .subscribe(response => {
                this.products = response.product;
                this.prdInitialised = true;
                this.productsUpdated.next([...this.products]);
            });
        }
    }

    getAll() {
        return [...this.products];
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

    deleteProduct(id: string) {
        const prdId = Number(id);
        this.http
        .delete("http://localhost:3000/products/"+id)
        .subscribe(response => {
            const deletedPrdIndex = this.products.findIndex(prd => {
                return prd.productId == prdId
            });
            this.products.slice(deletedPrdIndex, 1);
        }, err => {
            console.log(err);
        }, () => {
            this.router.navigate(['/admin/products']);
        }) 
    }
}