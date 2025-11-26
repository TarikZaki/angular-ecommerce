import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { product } from '@org/models';
import { CartService } from '@org/services';
import { Button } from '@org/ui';
import { ToastService } from 'ngx-toastr-notifier';

/**
 *  * Product card component.
 */
@Component({
  selector: 'lib-product-card',
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardAvatar,
    Button,
  ],
  templateUrl: './productCard.html',
  styleUrl: './productCard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastService);
  product = input.required<product>();

  /**
   *  Add product to cart
   */
  addToCart(id: string) {
    this.cartService.AddProductToCart(id).subscribe({
      next: () => {
        this.toastrService.success('Product added to cart successfully');
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
