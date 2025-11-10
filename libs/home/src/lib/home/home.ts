import { Auth } from './../../../../auth/src/lib/services/auth';
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
  handleSignout() {
    this.auth.signout(); // auth logic هنا
  }
}
