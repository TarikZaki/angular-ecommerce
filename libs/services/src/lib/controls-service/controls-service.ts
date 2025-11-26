import { inject, Injectable, signal } from '@angular/core';
import { CartData } from '@org/models';

import { CartService } from '../cart-service/cart-service';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class ControlsService {
  private readonly cartService = inject(CartService);

  cart = signal<CartData | null>(null);
  numOfCartItems = signal<number | null>(null);
  loadingProductId = signal<string | null>(null);

  /**
   *  to Get logged user data
   */
  loadCart(): void {
    this.cartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this.cart.set(res.data);
        this.numOfCartItems.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   *  Increment product quantity
   */
  incrementQuantity(productId: string, currentCount: number): void {
    this.loadingProductId.set(productId);

    this.cartService
      .UpdateProductQuantityInCart(productId, currentCount + 1)
      .subscribe({
        next: (res) => {
          this.cart.set(res.data);
          this.numOfCartItems.set(res.numOfCartItems);
          this.loadingProductId.set(null);
        },
        error: () => {
          this.loadingProductId.set(null);
        },
      });
  }

  /**
   * Decrement product quantity
   */
  decrementQuantity(productId: string, currentCount: number): void {
    this.loadingProductId.set(productId);
    this.cartService
      .UpdateProductQuantityInCart(productId, currentCount - 1)
      .subscribe({
        next: (res) => {
          this.cart.set(res.data);
          this.numOfCartItems.set(res.numOfCartItems);
          this.loadingProductId.set(null);
        },
        error: () => {
          this.loadingProductId.set(null);
        },
      });
  }

  /**
   * Remove product from cart
   */
  removeProduct(productId: string): void {
    this.loadingProductId.set(productId);

    this.cartService.RemoveProductFromCart(productId).subscribe({
      next: (res) => {
        this.cart.set(res.data);
        this.numOfCartItems.set(res.numOfCartItems);
        this.loadingProductId.set(null);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.loadingProductId.set(null);
      },
    });
  }

  /**
   * Check if a specific product is loading
   */
  isProductLoading(productId: string): boolean {
    return this.loadingProductId() === productId;
  }
}
