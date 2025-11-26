import { Component, input } from '@angular/core';
import { CartData } from '@org/models';
import { ProductControls } from '@org/product-controls';

import { CartItems } from '../cart-items/cart-items';

/**
 *
 */
@Component({
  selector: 'lib-item-box',
  imports: [CartItems, ProductControls],
  templateUrl: './item-box.html',
  styleUrl: './item-box.css',
})
export class ItemBox {
  cart = input<CartData | null>();
}
