import { Component, inject, OnInit, signal } from '@angular/core';
import { CartData } from '@org/models';
import { CartService } from '@org/services';

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
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails = signal<CartData | null>(null);
  /**
   *  On init
   */
  ngOnInit(): void {
    this.getLoggedUserData();
  }

  /**
   *   Get logged user data
   */
  getLoggedUserData(): void {
    this.cartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
        console.log(res.data);
      },
    });
  }
}
