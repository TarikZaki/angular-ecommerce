import { ShippingAddress } from './create-orders';
import { product } from './product';

export interface UserOrdersResponse {
  results: number;
  data: Order[];
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface OrderCartItem {
  count: number;
  _id: string;
  product: product;
  price: number;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
