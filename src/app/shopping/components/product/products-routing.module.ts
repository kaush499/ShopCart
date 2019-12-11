import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product.component';

const productsRoutes: Routes = [
    { path: "", component: ProductComponent, pathMatch: "full", children: [
        { path: "", component: ProductListComponent, pathMatch: "full" },
        { path: ":id", component: ProductDetailComponent }
    ] } 
]

@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}