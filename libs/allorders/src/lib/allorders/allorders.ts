import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Order } from '@org/models';
import { AuthService, CartService } from '@org/services';

/**
 * Displays all orders for the logged-in user.
 */
@Component({
  selector: 'lib-allorders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './allorders.html',
  styleUrl: './allorders.css',
})
export class Allorders implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  orders = signal<Order[]>([]);
  isLoading = signal(true);

  /**
   * Load user orders on init.
   */
  ngOnInit(): void {
    const decodedToken = this.authService.decodeToken();

    if (decodedToken?.id) {
      this.getAllUserOrders(decodedToken.id);
      return;
    }

    this.isLoading.set(false);
  }

  /**
   * Fetch all orders for the given user id.
   */
  getAllUserOrders(userId: string): void {
    this.cartService.getUserOrders(userId).subscribe({
      next: (res) => {
        this.orders.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
