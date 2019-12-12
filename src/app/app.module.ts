import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/services/auth-interceptor';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ErrorPageComponent } from './error/components/error-page/error-page.component';
import { ErrorModalComponent } from './error/components/error-modal/error-modal.component';
import { PageNotFoundComponent } from './error/components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ErrorModalComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShoppingModule,
    AuthModule,
    UserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
