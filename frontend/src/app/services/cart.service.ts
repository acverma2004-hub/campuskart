import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models';

const STORAGE_KEY = 'campuskart-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>(this.load());

  totalQuantity = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  totalPrice = computed(() => this.items().reduce((sum, i) => sum + i.quantity * i.unitPrice, 0));

  add(product: Product) {
    const existing = this.items().find(i => i.productId === product.id);
    if (existing) {
      this.setQuantity(product.id, existing.quantity + 1);
      return;
    }
    if (product.unitsInStock < 1) {
      return;
    }
    this.update([
      ...this.items(),
      {
        productId: product.id,
        name: product.name,
        unitPrice: product.unitPrice,
        quantity: 1,
        maxQty: product.unitsInStock
      }
    ]);
  }

  setQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      this.remove(productId);
      return;
    }
    this.update(
      this.items().map(i =>
        i.productId === productId ? { ...i, quantity: Math.min(quantity, i.maxQty) } : i
      )
    );
  }

  remove(productId: number) {
    this.update(this.items().filter(i => i.productId !== productId));
  }

  clear() {
    this.update([]);
  }

  private update(list: CartItem[]) {
    this.items.set(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // storage can be blocked, the cart still works for this session
    }
  }

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}
