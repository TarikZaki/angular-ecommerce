import { Component, inject, input } from '@angular/core';
import { ControlsService } from '@org/services';
/**
 *
 */
@Component({
  selector: 'lib-product-controls',
  imports: [],
  templateUrl: './product-controls.html',
  styleUrl: './product-controls.css',
})
export class ProductControls {
  private readonly controlsService = inject(ControlsService);

  productId = input.required<string>();
  count = input.required<number>();

  /**
   * Check if this product is currently loading
   */
  get isLoading(): boolean {
    return this.controlsService.isProductLoading(this.productId());
  }

  /**
   *  handle delete item
   */
  handleIncrement() {
    this.controlsService.incrementQuantity(this.productId(), this.count());
  }

  /**
   *  handle delete item
   */
  handleDecrement() {
    this.controlsService.decrementQuantity(this.productId(), this.count());
  }

  /**
   *  handle delete item
   */
  handleDelete() {
    this.controlsService.removeProduct(this.productId());
  }
}
