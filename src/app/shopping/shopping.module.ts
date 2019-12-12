import { NgModule } from '@angular/core';

import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductCardComponent } from './components/product/product-list/product-card/product-card.component';
import { ProductFilterComponent } from './components/product/product-list/product-filter/product-filter.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductCardComponent,
        ProductFilterComponent,
        ProductComponent,
        CartComponent,
        CartItemComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ShoppingModule {}