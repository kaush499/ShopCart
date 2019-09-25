import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductComponent, children: [
    { path: '', component: ProductListComponent },
    { path: "new", component: ProductCreateComponent },
    {path: ":id", component: ProductDetailComponent},
    {path: ":id/edit", component: ProductCreateComponent}
  ]},
  { path: "cart", component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
