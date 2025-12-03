import { inject, Injectable, signal } from '@angular/core';
import {
  AddToCartData,
  CartData,
  CartItem,
  getCartItemProductId,
  GetUserCart,
} from '@org/models';

import { CartService } from '../cart-service/cart-service';

/**
 * Service for managing cart controls and local cart state.
 * Handles cart operations like loading, updating quantities, and removing products.
 */
@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  private readonly cartService = inject(CartService);

  cart = signal<CartData | AddToCartData | null>(null);
  numOfCartItems = signal<number | null>(null);
  loadingProductId = signal<string | null>(null);
  localCartProducts = signal<Map<string, number>>(new Map());

  /**
   * Loads the logged-in user's cart data from the server.
   */
  loadCart(): void {
    this.cartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this.updateLocalCartProducts(res.data.products);
        this.cart.set(res.data);
        this.numOfCartItems.set(res.numOfCartItems);
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
        this.cart.set(null);
        this.localCartProducts.set(new Map());
      },
    });
  }

  /**
   * Updates the local cart products map with the latest cart items.
   * This creates a Map of product IDs to their quantities for quick lookups.
   *
   * @param products - Array of cart items to process
   */
  updateLocalCartProducts(products: CartItem[]): void {
    this.localCartProducts.update(() => {
      const newMap = new Map<string, number>();
      products.forEach((item) => {
        const productId = getCartItemProductId(item);
        if (productId) {
          newMap.set(productId, item.count);
        }
      });

      return newMap;
    });
  }

  /**
   * Increments the quantity of a product in the cart.
   *
   * @param productId - The ID of the product to increment
   * @param currentCount - The current quantity of the product
   */
  incrementQuantity(productId: string, currentCount: number): void {
    this.loadingProductId.set(productId);
    this.cartService
      .UpdateProductQuantityInCart(productId, currentCount + 1)
      .subscribe({
        next: (res) => {
          this.handleCartUpdate(res);
        },
        error: (err) => {
          console.error('Failed to increment product quantity:', err);
          this.loadingProductId.set(null);
        },
      });
  }

  /**
   * Decrements the quantity of a product in the cart.
   *
   * @param productId - The ID of the product to decrement
   * @param currentCount - The current quantity of the product
   */
  decrementQuantity(productId: string, currentCount: number): void {
    this.loadingProductId.set(productId);
    this.cartService
      .UpdateProductQuantityInCart(productId, currentCount - 1)
      .subscribe({
        next: (res) => {
          this.handleCartUpdate(res);
        },
        error: (err) => {
          console.error('Failed to decrement product quantity:', err);
          this.loadingProductId.set(null);
        },
      });
  }

  /**
   * Removes a product from the cart.
   *
   * @param productId - The ID of the product to remove
   */
  removeProduct(productId: string): void {
    this.loadingProductId.set(productId);

    this.cartService.RemoveProductFromCart(productId).subscribe({
      next: (res) => {
        this.handleCartUpdate(res);
      },
      error: (err) => {
        console.error('Failed to remove product from cart:', err);
        this.loadingProductId.set(null);
      },
    });
  }

  /**
   *  to handle Cart Update
   */
  private handleCartUpdate(res: GetUserCart): void {
    this.cart.set(res.data);
    this.updateLocalCartProducts(res.data.products);
    this.numOfCartItems.set(res.numOfCartItems);
    this.loadingProductId.set(null);
  }

  /**
   * Checks if a specific product is currently being processed (loading state).
   *
   * @param productId - The ID of the product to check
   * @returns True if the product is currently loading, false otherwise
   */
  isProductLoading(productId: string): boolean {
    return this.loadingProductId() === productId;
  }
}
