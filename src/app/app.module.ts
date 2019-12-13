import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/services/auth-interceptor';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ErrorModalComponent } from './error/components/error-modal/error-modal.component';
import { ErrorModule } from './error/error.module';
import { ErrorInterceptor } from './error/services/error-interceptor';
import { GlobalErrorHandlerService } from './error/services/global-error-handler.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShoppingModule,
    AuthModule,
    UserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    ErrorModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorModalComponent]
})
export class AppModule { }
