import { Component, input } from '@angular/core';
import { CartData } from '@org/models';

import { CartItems } from '../cart-items/cart-items';

/**
 *
 */
@Component({
  selector: 'lib-item-box',
  imports: [CartItems],
  templateUrl: './item-box.html',
  styleUrl: './item-box.css',
})
export class ItemBox {
  cart = input<CartData | null>();
}
