import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { CartService } from '../cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class ProductService {
    imgLink: string = "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg"

    private productsChange = new Subject<Product[]>();

    private products: Product[] = [
        // new Product("1", "Mobile", "test product 1", this.imgLink, 100, false),
        // new Product("2","Mobile", "test product 2", this.imgLink, 200, false),
        // new Product("3","Mobile", "test product 3", this.imgLink, 300, false),
        // new Product("4","Mobile", "test product 4", this.imgLink, 400, false)
    ];

    constructor(private cartService: CartService,
                private http: HttpClient) {}

    setProducts(){
        this.http.get<{message: string; products: any}>("http://localhost:3000/products")
        .pipe(
            map(productData => {
              return productData.products.map(product => {
                return {
                    id: product._id,
                    category: product.category,
                    title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    addedToCart: product.addedToCart
                };
              });
            })
          )
          .subscribe(transformedProducts => {
            this.products = transformedProducts;
            this.productsChange.next([...transformedProducts]);
          });
    }            

    getProductsChange(){
        return this.productsChange.asObservable();
    }

    getProducts(){
        return this.products.slice();
        
    }

    getProduct(id: string) {
        const item = this.products.find( x => x.id === id );
        return item;
    }

    addProduct(newProduct: Product) {
        // this.products.push(newProduct);
        this.http
        .post<{message: string, productId: string}>(
            'http://localhost:3000/products/new',
             newProduct
             )
             .subscribe(responseData => {
                 const id = responseData.productId;
                 newProduct.id = id;
                 this.products.push(newProduct);
                 this.productsChange.next([...this.products]);
             })
    } 

    addToCart(id: string){
        const item = this.products.find( x => x.id === id );
        const title = item.title;
        const imageUrl = item.imageUrl;
        const price = item.price;
        this.cartService.addItem(id, title, imageUrl, price);
    }

    removeFromCart(id: string){
        let cartItem = this.products.find(product => product.id === id);
        cartItem.addedToCart = false;
    }

    updateProduct(id: string, updatedProduct: Product) {
        // const item = this.products.find( x => x.id === id );
        // const index = this.products.indexOf(item);
        // this.products[index] = updatedProduct;
        this.http
            .put<{message: string}>('http://localhost:3000/products/'+id, updatedProduct)
            .subscribe(response => {
                const index = this.products.findIndex(p => p.id === id);
                this.products[index] = updatedProduct;
                this.productsChange.next([...this.products]);
            });
    }

    deleteProduct(id: string){
        // const item = this.products.find( x => x.id === id );
        // const index = this.products.indexOf(item);
        // this.products.splice(index, 1);
        this.http
            .delete<{message: string}>('http://localhost:3000/products/'+id)
            .subscribe(response => {
                const index = this.products.findIndex(p => p.id === id);
                this.products.splice(index, 1);
                this.productsChange.next([...this.products]);
            })
    }
}