import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
/**
 * Responsive navigation bar showing links based on authentication state.
 */
export class Navbar {
  isLoggedIn = input.required<boolean>();
  isMenuOpen = false;
  clickSignout = output<void>();

  /**
   * Emits a sign out event to the parent component.
   */
  handleSignout() {
    this.clickSignout.emit();
  }
  /**
   * Toggles the mobile menu open/closed state.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  mainLinks = [
    { label: 'Home', path: 'home' },
    { label: 'Products', path: 'products' },
    { label: 'Categories', path: 'categories' },
    { label: 'Brands', path: 'brands' },
  ];

  socialLinks = [
    { icon: 'fab fa-instagram' },
    { icon: 'fa-brands fa-facebook' },
    { icon: 'fab fa-tiktok' },
    { icon: 'fab fa-twitter' },
    { icon: 'fab fa-linkedin' },
    { icon: 'fab fa-youtube' },
  ];

  authLinksLoggedIn = [
    { label: 'Cart', path: 'cart' },
    { label: 'Signout', path: 'signout' },
  ];

  authLinksLoggedOut = [
    { label: 'Login', path: 'login' },
    { label: 'Register', path: 'register' },
  ];

  /**
   * Returns auth-related navigation links based on login state.
   */
  get authLinks() {
    return this.isLoggedIn() ? this.authLinksLoggedIn : this.authLinksLoggedOut;
  }

  menuBars = [1, 2, 3];
}
