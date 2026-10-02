export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string | null;
  unitsInStock: number;
  category: Category;
}

export interface CartItem {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  maxQty: number; // stock available when the item was added
}

export interface OrderForm {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}
