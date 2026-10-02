import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <a routerLink="/" class="back">Back to products</a>

    @if (error()) {
      <p class="error">{{ error() }}</p>
    } @else if (product(); as p) {
      <section class="details">
        @if (p.imageUrl) {
          <img [src]="p.imageUrl" [alt]="p.name" />
        } @else {
          <div class="ph big">{{ p.name.charAt(0) }}</div>
        }

        <div>
          <p class="muted">{{ p.category.name }}</p>
          <h2>{{ p.name }}</h2>
          <p>{{ p.description }}</p>
          <p class="price big-price">{{ p.unitPrice | currency: 'INR' : 'symbol' : '1.0-0' }}</p>

          @if (p.unitsInStock === 0) {
            <p class="error">Currently out of stock</p>
          } @else {
            <p class="muted">{{ p.unitsInStock }} in stock</p>
            <button type="button" (click)="add(p)">Add to cart</button>
          }

          @if (added()) {
            <p class="ok">Added to your cart. <a routerLink="/cart">View cart</a></p>
          }
        </div>
      </section>
    } @else {
      <p>Loading...</p>
    }
  `
})
export class ProductDetailsComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cart = inject(CartService);

  product = signal<Product | null>(null);
  added = signal(false);
  error = signal('');

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.added.set(false);
      this.productService.getProduct(params.get('id') ?? '').subscribe({
        next: p => this.product.set(p),
        error: () => this.error.set('This product could not be found.')
      });
    });
  }

  add(product: Product) {
    this.cart.add(product);
    this.added.set(true);
  }
}
