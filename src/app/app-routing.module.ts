import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { HomeComponent } from './core/components/home/home.component';
import { CartRoutesConfig, ProductRoutesConfig } from './shopping/shopping-routes-config';
import { authRoutesConfig } from './auth/auth-routes-config';
import { MyOrdersComponent } from './user/components/my-orders/my-orders.component';
import { AdminAuthGuard } from './admin/services/admin-auth.guard';
import { ShowNavbarComponent } from './core/components/page-navbar/show-navbar/show-navbar.component';
import { HideNavbarComponent } from './core/components/page-navbar/hide-navbar/hide-navbar.component';
import { PageNotFoundComponent } from './error/components/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error/components/error-page/error-page.component';

const appRoutes: Routes = [
   { path: '', component: ShowNavbarComponent, children: [
    { path: '', component: HomeComponent, pathMatch: "full" },
    { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    ...ProductRoutesConfig,
    { path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    
   ] },
   { path: '', component: HideNavbarComponent, children: [
    ...CartRoutesConfig, 
    { path: "check-out", loadChildren: () =>  import('./check-out/check-out.module').then(m => m.CheckOutModule) },
    ...authRoutesConfig,
    { path: 'error', component: ErrorPageComponent }
   ]}
   //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminAuthGuard
  ]
})
export class AppRoutingModule { }
