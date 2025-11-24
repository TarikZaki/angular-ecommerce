export interface AddtocartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: AddToCartData;
}

export interface AddToCartData {
  _id: string;
  cartOwner: string;
  products: AddToCartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddToCartProduct {
  count: number;
  _id: string;
  product: string;
  price: number;
}
