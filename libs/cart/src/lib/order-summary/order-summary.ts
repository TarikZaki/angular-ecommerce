import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartData } from '@org/models';

/**
 *
 */
@Component({
  selector: 'lib-order-summary',
  imports: [RouterLink],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
  cart = input<CartData | null>();
}
