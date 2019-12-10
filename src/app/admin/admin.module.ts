import { NgModule } from '@angular/core';
import { AdminProductListComponent } from './admin-products/admin-product-list/admin-product-list.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ProductCreateComponent } from './admin-products/product-create/product-create.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbdSortableHeader } from './admin-products/admin-product-list/data-table.service';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    declarations: [
        AdminProductListComponent,
        AdminOrdersComponent,
        AdminProductsComponent,
        ProductCreateComponent,
        NgbdSortableHeader,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ]
})
export class AdminModule {}