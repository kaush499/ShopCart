import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/product/product.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class AdminProuctService {
    private prdInitialised: boolean = false;
    private products: Product[] = [];
    private productsUpdated = new Subject<Product[]>();

    constructor(private http: HttpClient,
                private router: Router) {}

        // observable for the updated prds
    getProductsUpdated() {
        return this.productsUpdated.asObservable();
    }

    // gets the specific prd from server by its id
    getProductById(id: number){
        return this.http
                .get<{product: Product}>
                (`http://localhost:3000/admin/products/${id}`)
                .pipe(map(response => {
                    return response.product;
                }));
    }

    // initialises the prds before entering prds list
    initialiseProducts() {
        if(!this.prdInitialised){
            this.http
            .get<{product: Product[]}>
            ("http://localhost:3000/admin/products")
            .subscribe(response => {
                this.products = response.product;
                this.prdInitialised = true;
                this.productsUpdated.next([...this.products]);
            });
        }
    }

    // returns all products
    // this is all is done so that the server is not called again and agian and we have list 
    // prds here itself on client side
    getAllProducts() {
        return [...this.products];
    }
        
    // adding prd
    addProduct(product: any) {
        const newProduct = {
            title: product.title,
            imagePath: product.imageUrl,
            category: Number(product.category),
            price: product.price
        };
        this.http
        .post<{productId: number}>
        ('http://localhost:3000/admin/products', {newProduct: newProduct})
        .subscribe(response => {
             this.products.push({
                title: product.title,
                imagePath: product.imageUrl,
                categoryName: product.categoryName,
                price: product.price,
                productId: response.productId,
                categoryId: newProduct.category
             });
             this.router.navigate(['/admin/products']);
        }, err => {
            console.log(err);
        });
    }

    // Updating prd
    editProduct(product, id) {
        const prdId = Number(id);
        const updatedProduct = {
            title: product.title,
            imagePath: product.imageUrl,
            category: Number(product.category),
            price: product.price
        };
        this.http
        .put(`http://localhost:3000/admin/products/${id}`, { updatedProduct: updatedProduct })
        .subscribe(response => {
            const editedPrdIndex = this.products.findIndex(prd => {
                return prd.productId == prdId
            });
            this.products[editedPrdIndex] = {
                title: product.title,
                imagePath: product.imageUrl,
                categoryName: product.categoryName,
                price: product.price,
                productId: prdId,
                categoryId: updatedProduct.category
            }
            this.router.navigate(['/admin/products']);
        })
    }

    // deleting prd
    deleteProduct(id: string) {
        const prdId = Number(id);
        this.http
        .delete(`http://localhost:3000/admin/products/${id}`)
        .subscribe(response => {
            const deletedPrdIndex = this.products.findIndex(prd => {
                return prd.productId == prdId
            });
            this.products.splice(deletedPrdIndex, 1);
            this.router.navigate(['/admin/products']);
        }, err => {
            console.log(err);
        }); 
    }
}