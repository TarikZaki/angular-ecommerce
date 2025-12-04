import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@org/services';
import { Button, Input } from '@org/ui';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

/**
 *
 */
@Component({
  selector: 'lib-login',
  imports: [Input, ReactiveFormsModule, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
/**
 * Login component handling user authentication.
 */
export class Login {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  msgError = signal('');
  isLoading = signal(false);

  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  newRes: Subscription = new Subscription();
  /**
   * Submits the login form and handles success/error states.
   */
  onSubmitForm() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.newRes?.unsubscribe();
      this.newRes = this.authService
        .loginForm(this.loginForm.getRawValue())
        .subscribe({
          next: (res) => {
            this.isLoading.set(false);
            this.cookieService.set('token', res.token);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading.set(false);
            this.msgError.set(err.error.message || 'Something went wrong');
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
