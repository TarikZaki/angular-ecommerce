import { Auth } from '@org/auth';
import { Component, inject } from '@angular/core';
import { Navbar } from '@org/ui';

@Component({
  selector: 'lib-home',
  imports: [Navbar],
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
