import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminProductListComponent } from './components/admin/admin-products/admin-product-list/admin-product-list.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { ProductCreateComponent } from './components/admin/admin-products/product-create/product-create.component';
import { AdminComponent } from './components/admin/admin.component';

import { NgbdSortableHeader } from './services/data-table.service';
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
    ]
})
export class AdminModule {}