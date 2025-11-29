import { Component, inject, OnInit } from '@angular/core';
import { ControlsService } from '@org/services';

import { MainSlider } from '../components/main-slider/main-slider';
import { PopularCategories } from '../components/popular-categories/popular-categories';
import { PopularProducts } from '../components/popular-products/popular-products';

/**
 *    Home Component
 */
@Component({
  selector: 'lib-home',
  imports: [PopularProducts, MainSlider, PopularCategories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly controlsService = inject(ControlsService);

  /**
   * Initializes the home component by loading the user's cart.
   */
  ngOnInit(): void {
    this.controlsService.loadCart();
  }
}
