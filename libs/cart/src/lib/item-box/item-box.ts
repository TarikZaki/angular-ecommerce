import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartData } from '@org/models';
import { ProductControls } from '@org/product-controls';
import { Button } from '@org/ui';

import { CartItems } from '../cart-items/cart-items';
/**
 *
 */
@Component({
  selector: 'lib-item-box',
  imports: [CartItems, ProductControls, Button, RouterLink],
  templateUrl: './item-box.html',
  styleUrl: './item-box.css',
})
export class ItemBox {
  cart = input<CartData | null>();
}
