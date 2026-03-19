export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  isFlashSale?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'esewa' | 'bank' | 'wallet' | 'cod';

export interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  deliveryLocation: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  shippingDetails: ShippingDetails;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}
