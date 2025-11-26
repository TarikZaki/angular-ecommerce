import { Component, inject } from '@angular/core';
import { ControlsService } from '@org/services';

/**
 *  Cart Items Component
 */
@Component({
  selector: 'lib-cart-items',
  imports: [],
  templateUrl: './cart-items.html',
  styleUrl: './cart-items.css',
})
export class CartItems {
  private readonly controlsService = inject(ControlsService);

  numOfitems = this.controlsService.numOfCartItems;
}
