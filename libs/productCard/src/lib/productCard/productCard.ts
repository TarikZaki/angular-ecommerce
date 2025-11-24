import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
import { Button } from '@org/ui';

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
  product = input.required<product>();
}
