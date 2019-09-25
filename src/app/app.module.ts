import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartItemComponent } from './cart/cart-list/cart-item/cart-item.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartService } from './cart/cart.service';
import { ProductService } from './product/product.service';
import { EmptyCartComponent } from './cart/empty-cart/empty-cart.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductItemComponent } from './product/product-list/product-item/product-item.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    CartListComponent,
    EmptyCartComponent,
    HomeComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CartService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
