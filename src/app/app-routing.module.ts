import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { HomeComponent } from './core/components/home/home.component';
import { CartRoutesConfig, ProductRoutesConfig } from './shopping/shopping-routes-config';
import { authRoutesConfig } from './auth/auth-routes-config';
import { HideNavbarComponent } from './core/components/page-navbar/hide-navbar/hide-navbar.component';
import { ShowNavbarComponent } from './core/components/page-navbar/show-navbar/show-navbar.component';
import { MyOrdersComponent } from './user/components/my-orders/my-orders.component';
import { AdminAuthGuard } from './admin/services/admin-auth.guard';
import { AdminComponent } from './admin/components/admin/admin.component';

const appRoutes: Routes = [
  { path: "", component: ShowNavbarComponent, children: [
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "my/orders", component: MyOrdersComponent, canActivate: [AuthGuard] },
    ...ProductRoutesConfig,
    { path: "admin", component: AdminComponent, loadChildren: './admin/admin.module#AdminModule' },
    
  ]},
  { path: "", component: HideNavbarComponent, children: [
    ...CartRoutesConfig,
    { path: "check-out", pathMatch: "full", loadChildren: () =>  import('./check-out/check-out.module').then(m => m.CheckOutModule) },
    ...authRoutesConfig
  ]},
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminAuthGuard
  ]
})
export class AppRoutingModule { }
