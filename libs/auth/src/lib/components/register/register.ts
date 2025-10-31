import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button, Input } from '@org/ui';
import { Subscription } from 'rxjs';

import { Auth } from '../../services/auth';
@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule, Input, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
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
    { validators: this.confirmPassword }
  );

  ngOnInit() {
    console.log('hoh');
  }
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { misMatch: true };
  }

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
