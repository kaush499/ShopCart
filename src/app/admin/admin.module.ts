import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminProductListComponent } from './components/admin/admin-products/admin-product-list/admin-product-list.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { ProductCreateComponent } from './components/admin/admin-products/product-create/product-create.component';
import { AdminComponent } from './components/admin/admin.component';

import { NgbdSortableHeader, TableService } from './services/data-table.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        AdminProductListComponent,
        AdminOrdersComponent,
        AdminProductsComponent,
        ProductCreateComponent,
        NgbdSortableHeader,
        AdminComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    providers: [
        TableService
    ]
})
export class AdminModule {}