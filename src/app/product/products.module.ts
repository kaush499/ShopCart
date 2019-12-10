import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { ProductFilterComponent } from './product-list/product-filter/product-filter.component';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductCardComponent,
        ProductFilterComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule
    ]
})
export class ProductsModule {}