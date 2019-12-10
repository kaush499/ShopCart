import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminProductListComponent } from './admin-products/admin-product-list/admin-product-list.component';
import { ProductCreateComponent } from './admin-products/product-create/product-create.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const adminRoutes: Routes = [
    { path: "admin/products", component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard], children: [
        { path: '', component: AdminProductListComponent },
        { path: "new", component: ProductCreateComponent },
        { path: ":id", component: ProductCreateComponent }
        ]},
    { path: "admin/orders", component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
]

@NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ],
    providers: [
        AuthGuard,
        AdminAuthGuard
    ]
})
export class AdminRoutingModule {}