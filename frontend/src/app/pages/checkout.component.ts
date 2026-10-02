import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { OrderForm } from '../models';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, RouterLink, CurrencyPipe],
  template: `
    @if (trackingNumber()) {
      <section class="done">
        <h2>Order placed</h2>
        <p>Your tracking number is <strong>{{ trackingNumber() }}</strong>.</p>
        <p><a routerLink="/">Continue shopping</a></p>
      </section>
    } @else if (cart.items().length === 0) {
      <p>Your cart is empty. <a routerLink="/">Browse products</a></p>
    } @else {
      <h2>Checkout</h2>

      <div class="checkout">
        <form #f="ngForm" (ngSubmit)="submit(f.valid ?? false)" novalidate>
          <label>
            Full name
            <input name="customerName" [(ngModel)]="form.customerName" required />
          </label>
          <label>
            Email
            <input type="email" name="email" [(ngModel)]="form.email" required email />
          </label>
          <label>
            Phone (10 digits)
            <input name="phone" [(ngModel)]="form.phone" required pattern="[0-9]{10}" />
          </label>
          <label>
            Address
            <input name="address" [(ngModel)]="form.address" required />
          </label>
          <label>
            City
            <input name="city" [(ngModel)]="form.city" required />
          </label>
          <label>
            Pincode (6 digits)
            <input name="pincode" [(ngModel)]="form.pincode" required pattern="[0-9]{6}" />
          </label>

          @if (tried() && f.invalid) {
            <p class="error">Please fill every field. Phone needs 10 digits and pincode needs 6.</p>
          }
          @if (error()) {
            <p class="error">{{ error() }}</p>
          }

          <button type="submit" [disabled]="sending()">
            {{ sending() ? 'Placing order...' : 'Place order' }}
          </button>
          <p class="muted">Payment is cash on delivery. There is no online payment in this project.</p>
        </form>

        <aside class="summary">
          <h3>Order summary</h3>
          @for (item of cart.items(); track item.productId) {
            <p>{{ item.quantity }} x {{ item.name }}</p>
          }
          <p>
            Total: <strong>{{ cart.totalPrice() | currency: 'INR' : 'symbol' : '1.0-0' }}</strong>
          </p>
        </aside>
      </div>
    }
  `
})
export class CheckoutComponent {
  cart = inject(CartService);
  private orderService = inject(OrderService);

  form: OrderForm = { customerName: '', email: '', phone: '', address: '', city: '', pincode: '' };

  tried = signal(false);
  sending = signal(false);
  error = signal('');
  trackingNumber = signal('');

  submit(valid: boolean) {
    this.tried.set(true);
    this.error.set('');
    if (!valid) {
      return;
    }

    this.sending.set(true);
    const items = this.cart.items().map(i => ({ productId: i.productId, quantity: i.quantity }));

    this.orderService.placeOrder(this.form, items).subscribe({
      next: res => {
        this.trackingNumber.set(res.trackingNumber);
        this.cart.clear();
        this.sending.set(false);
      },
      error: err => {
        this.error.set(err.error?.message ?? 'Could not place the order. Please try again.');
        this.sending.set(false);
      }
    });
  }
}
