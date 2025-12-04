import { Component } from '@angular/core';

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
export class Home {}
