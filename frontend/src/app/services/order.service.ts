import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderForm } from '../models';
import { API_URL } from './product.service';

export interface OrderResponse {
  trackingNumber: string;
  totalPrice: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  placeOrder(form: OrderForm, items: { productId: number; quantity: number }[]) {
    return this.http.post<OrderResponse>(`${API_URL}/orders`, { ...form, items });
  }
}
