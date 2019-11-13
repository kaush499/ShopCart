import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './user/my-orders/my-orders.component';
import { ProductCreateComponent } from './admin/admin-products/product-create/product-create.component';
import { AdminProductListComponent } from './admin/admin-products/admin-product-list/admin-product-list.component';
import { NgbdSortableHeader } from './admin/admin-products/admin-product-list/data-table.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product/product-list/product-card/product-card.component';
import { ProductFilterComponent } from './product/product-list/product-filter/product-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminProductListComponent,
    CartComponent,
    HomeComponent,
    ProductDetailComponent,
    SignupComponent,
    LoginComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    MyOrdersComponent,
    ProductCreateComponent,
    NgbdSortableHeader,
    ProductCardComponent,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
