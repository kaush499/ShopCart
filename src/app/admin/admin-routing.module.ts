import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminProductListComponent } from './components/admin/admin-products/admin-product-list/admin-product-list.component';
import { ProductCreateComponent } from './components/admin/admin-products/product-create/product-create.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';


const adminRoutes: Routes = [
    { path: "", component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard], children: [
        { path: "products", component: AdminProductsComponent, children: [
            { path: '', component: AdminProductListComponent, pathMatch: "full", },
            { path: "new", component: ProductCreateComponent },
            { path: ":id", component: ProductCreateComponent }
        ]},
        { path: "orders", component: AdminOrdersComponent }
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ]
})
export class AdminRoutingModule {}