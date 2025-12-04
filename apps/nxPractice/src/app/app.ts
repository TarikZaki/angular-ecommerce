import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@org/services';
import { Footer, Navbar } from '@org/ui';

/**
 *
 */
@Component({
  imports: [RouterModule, Footer, Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
/**
 * Root application component.
 */
export class App {
  readonly auth = inject(AuthService);
  protected title = 'nxPractice';
  /**
   * function to call signout from auth service
   */
  handleSignout() {
    this.auth.signout();
  }
}
