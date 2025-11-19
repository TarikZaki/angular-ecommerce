import { Component, inject } from '@angular/core';
import { Auth } from '@org/auth';
import { Navbar } from '@org/ui';

import { MainSlider } from '../components/main-slider/main-slider';
import { PopularCategories } from '../components/popular-categories/popular-categories';
import { PopularProducts } from '../components/popular-products/popular-products';

/**
 *    Home Component
 */
@Component({
  selector: 'lib-home',
  imports: [Navbar, PopularProducts, MainSlider, PopularCategories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly auth = inject(Auth);

  /**
   * function to call signout from auth service
   */
  handleSignout() {
    this.auth.signout();
  }
}
