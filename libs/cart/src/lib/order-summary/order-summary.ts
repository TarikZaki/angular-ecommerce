import { Component, input } from '@angular/core';
import { CartData } from '@org/models';

/**
 *
 */
@Component({
  selector: 'lib-order-summary',
  imports: [],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
  cart = input<CartData | null>();
}
