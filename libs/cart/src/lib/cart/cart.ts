import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ControlsService } from '@org/services';

import { ItemBox } from '../item-box/item-box';
import { OrderSummary } from '../order-summary/order-summary';

/**
 *
 */
@Component({
  selector: 'lib-cart',
  imports: [ItemBox, OrderSummary],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart implements OnInit {
  private readonly controlsService = inject(ControlsService);

  cartDetails = this.controlsService.cart;
  /**
   *  On init
   */
  ngOnInit(): void {
    this.controlsService.loadCart();
  }
}
