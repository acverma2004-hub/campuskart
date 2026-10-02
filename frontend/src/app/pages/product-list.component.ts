import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <h2>{{ heading() }}</h2>

    @if (loading()) {
      <p>Loading products...</p>
    } @else if (error()) {
      <p class="error">{{ error() }}</p>
    } @else if (products().length === 0) {
      <p>Nothing found. Try a different search or category.</p>
    } @else {
      <div class="grid">
        @for (p of products(); track p.id) {
          <article class="card">
            <a [routerLink]="['/product', p.id]" class="card-link">
              @if (p.imageUrl) {
                <img [src]="p.imageUrl" [alt]="p.name" />
              } @else {
                <div class="ph">{{ p.name.charAt(0) }}</div>
              }
              <h3>{{ p.name }}</h3>
            </a>
            <p class="price">{{ p.unitPrice | currency: 'INR' : 'symbol' : '1.0-0' }}</p>
            <button type="button" (click)="add(p)" [disabled]="p.unitsInStock === 0">
              {{ p.unitsInStock === 0 ? 'Out of stock' : 'Add to cart' }}
            </button>
          </article>
        }
      </div>
    }
  `
})
export class ProductListComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cart = inject(CartService);

  products = signal<Product[]>([]);
  heading = signal('All products');
  loading = signal(true);
  error = signal('');

  constructor() {
    // runs again whenever the category id or search keyword in the url changes
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id') ?? undefined, params.get('keyword') ?? undefined);
    });
  }

  add(product: Product) {
    this.cart.add(product);
  }

  private load(categoryId?: string, keyword?: string) {
    this.loading.set(true);
    this.error.set('');

    this.productService.getProducts({ categoryId, keyword }).subscribe({
      next: list => {
        this.products.set(list);
        this.loading.set(false);

        if (keyword) {
          this.heading.set(`Results for "${keyword}"`);
        } else if (categoryId && list.length > 0) {
          this.heading.set(list[0].category.name);
        } else {
          this.heading.set(categoryId ? 'Category' : 'All products');
        }
      },
      error: () => {
        this.error.set('Could not load products. Check that the backend is running on port 8080.');
        this.loading.set(false);
      }
    });
  }
}
