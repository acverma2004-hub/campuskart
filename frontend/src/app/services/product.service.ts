import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category, Product } from '../models';

// change this if your backend runs somewhere else
export const API_URL = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts(filter: { categoryId?: string; keyword?: string } = {}) {
    let params = new HttpParams();
    if (filter.categoryId) {
      params = params.set('categoryId', filter.categoryId);
    }
    if (filter.keyword) {
      params = params.set('keyword', filter.keyword);
    }
    return this.http.get<Product[]>(`${API_URL}/products`, { params });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${API_URL}/categories`);
  }
}
