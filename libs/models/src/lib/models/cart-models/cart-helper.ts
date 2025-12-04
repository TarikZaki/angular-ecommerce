import { AddToCartProduct } from './add-to-cart-response';
import { CartProductItem } from './get-user-cart';

export type CartItem = AddToCartProduct | CartProductItem;

/**
 * Extracts the product ID from a cart item.
 * Handles both cases where product is a string ID or a full product object.
 *
 * @param item - The cart item (either AddToCartProduct or CartProductItem)
 * @returns The product ID as a string
 */
export function getCartItemProductId(item: CartItem): string {
  if (typeof item.product === 'string') {
    return item.product;
  }
  return item.product._id || item.product.id;
}
