import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';

export const ProductRoutesConfig = [
    { path: "products", component: ProductComponent, children: [
        { path: "", component: ProductListComponent },
        { path: ":id", component: ProductDetailComponent }
    ]}
]

export const CartRoutesConfig = [
    { path: "cart", component: CartComponent}
]