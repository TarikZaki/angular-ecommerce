export interface CreateCashOrders {
  status: string;
  data: Data;
}
export interface CreateVisaOrders {
  status: string;
  session: Session;
}

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface Data {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: CartItemm[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface CartItemm {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}
export interface CheckoutFormModel {
  shippingAddress: ShippingAddress;
}
