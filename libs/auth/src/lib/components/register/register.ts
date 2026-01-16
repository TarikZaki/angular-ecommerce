import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@org/services';
import { Button, Input } from '@org/ui';
import { Subscription } from 'rxjs';

import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
/**
 *
 */
@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule, Input, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
/**
 * Register component handling user signup flow.
 */
export class Register {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  msgError = signal('');
  isLoading = signal(false);

  registerForm = this.fb.group(
    {
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),

      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      rePassword: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: confirmPasswordValidator('password', 'rePassword') }
  );

  newRes: Subscription = new Subscription();
  /**
   * Submits the registration form and handles navigation and errors.
   */
  onSubmitForm() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.newRes?.unsubscribe();
      this.newRes = this.authService
        .registerForm(this.registerForm.getRawValue())
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
            this.isLoading.set(false);
          },
          error: (err) => {
            this.isLoading.set(false);
            this.msgError.set(err.error.message || 'Something went wrong');
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
