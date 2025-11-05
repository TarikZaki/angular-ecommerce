import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button, Input } from '@org/ui';
import { Subscription } from 'rxjs';

import { Auth } from '../../services/auth';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule, Input, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(Auth);
  private readonly fb = inject(NonNullableFormBuilder);

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
  onSubmitForm() {
    if (this.registerForm.valid) {
      this.newRes?.unsubscribe();
      this.newRes = this.authService
        .registerForm(this.registerForm.getRawValue())
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
