import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MyOrdersComponent } from './user/my-orders/my-orders.component';
import { ShowNavbarComponent } from './page-navbar/show-navbar/show-navbar.component';
import { HideNavbarComponent } from './page-navbar/hide-navbar/hide-navbar.component';
import { NavbarNavShowComponent } from './header/navbar-nav-show/navbar-nav-show.component';
import { NavbarNavHideComponent } from './header/navbar-nav-hide/navbar-nav-hide.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShippingComponent } from './check-out/shipping/shipping.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { ShippingAddressItemComponent } from './check-out/shipping/shipping-address-item/shipping-address-item.component';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    MyOrdersComponent,
    ShowNavbarComponent,
    HideNavbarComponent,
    NavbarNavShowComponent,
    NavbarNavHideComponent,
    CartItemComponent,
    CheckOutComponent,
    ShippingComponent,
    OrderSummaryComponent,
    AddressFormComponent,
    ShippingAddressItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
