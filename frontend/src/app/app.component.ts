import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { Category } from './models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="top">
      <a routerLink="/" class="brand">CampusKart</a>

      <div class="search">
        <input #box type="search" placeholder="Search products" (keyup.enter)="search(box.value)" />
        <button type="button" (click)="search(box.value)">Search</button>
      </div>

      <a routerLink="/cart" class="cart-link">
        Cart
        @if (cart.totalQuantity() > 0) {
          <span class="badge">{{ cart.totalQuantity() }}</span>
        }
      </a>
    </header>

    <nav class="cats">
      <a routerLink="/" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: true }">All</a>
      @for (c of categories(); track c.id) {
        <a [routerLink]="['/category', c.id]" routerLinkActive="on">{{ c.name }}</a>
      }
    </nav>

    <main>
      <router-outlet />
    </main>

    <footer>CampusKart is a practice project built while learning Angular and Spring Boot.</footer>
  `
})
export class AppComponent {
  cart = inject(CartService);
  categories = signal<Category[]>([]);
  private router = inject(Router);

  constructor() {
    inject(ProductService)
      .getCategories()
      .subscribe(list => this.categories.set(list));
  }

  search(text: string) {
    const keyword = text.trim();
    if (keyword) {
      this.router.navigate(['/search', keyword]);
    }
  }
}
