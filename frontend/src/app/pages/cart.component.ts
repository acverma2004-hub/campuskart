import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <h2>Your cart</h2>

    @if (cart.items().length === 0) {
      <p>Your cart is empty. <a routerLink="/">Browse products</a></p>
    } @else {
      <table class="cart">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (item of cart.items(); track item.productId) {
            <tr>
              <td>
                <a [routerLink]="['/product', item.productId]">{{ item.name }}</a>
              </td>
              <td>{{ item.unitPrice | currency: 'INR' : 'symbol' : '1.0-0' }}</td>
              <td class="qty">
                <button type="button" (click)="cart.setQuantity(item.productId, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button
                  type="button"
                  (click)="cart.setQuantity(item.productId, item.quantity + 1)"
                  [disabled]="item.quantity >= item.maxQty">+</button>
              </td>
              <td>{{ item.unitPrice * item.quantity | currency: 'INR' : 'symbol' : '1.0-0' }}</td>
              <td>
                <button type="button" class="link" (click)="cart.remove(item.productId)">Remove</button>
              </td>
            </tr>
          }
        </tbody>
      </table>

      <div class="total">
        <p>
          {{ cart.totalQuantity() }} items, total
          <strong>{{ cart.totalPrice() | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
        </p>
        <a routerLink="/checkout" class="btn">Go to checkout</a>
      </div>
    }
  `
})
export class CartComponent {
  cart = inject(CartService);
}
