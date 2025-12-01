import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { product } from '@org/models';
import { ProductControls } from '@org/product-controls';
import { CartService, ControlsService } from '@org/services';
import { Button } from '@org/ui';
import { ToastService } from 'ngx-toastr-notifier';

/**
 *  * Product card component.
 */
@Component({
  selector: 'lib-product-card',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardAvatar,
    Button,
    ProductControls,
  ],
  templateUrl: './productCard.html',
  styleUrl: './productCard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastService);
  private readonly controlsService = inject(ControlsService);
  product = input.required<product>();
  localCartProduct = this.controlsService.localCartProducts;

  /**
   * Adds a product to the cart and updates the local cart products map.
   *
   * @param id - The product ID to add to cart
   */
  addToCart(id: string): void {
    this.cartService.AddProductToCart(id).subscribe({
      next: (res) => {
        this.controlsService.updateLocalCartProducts(res.data.products);
        this.controlsService.numOfCartItems.set(res.numOfCartItems);
        this.toastrService.success('Product added to cart successfully');
      },
      error: (err) => {
        console.error('Failed to add product to cart:', err);
        this.toastrService.error(
          'Failed to add product to cart. Please try again.'
        );
      },
    });
  }

  /**
   * Gets the count/quantity of a specific product in the cart.
   *
   * @param id - The product ID to get the count for
   * @returns The product count, or 0 if not found
   */
  getProductCount(id: string): number {
    return this.localCartProduct()?.get(id) ?? 0;
  }
}
