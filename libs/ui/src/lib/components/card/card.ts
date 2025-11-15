import { Component, input } from '@angular/core';
import { product } from '@org/models';

import { Button } from '../button/button';

/**
 *
 */
@Component({
  selector: 'lib-card',
  imports: [Button],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
/**
 * Presentational card container component.
 */
export class Card {
  product = input.required<product>();
}
