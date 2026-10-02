import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list.component';
import { ProductDetailsComponent } from './pages/product-details.component';
import { CartComponent } from './pages/cart.component';
import { CheckoutComponent } from './pages/checkout.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];
