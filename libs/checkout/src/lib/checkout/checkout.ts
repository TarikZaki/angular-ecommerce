import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, Input, TextInput } from '@org/ui';
import { finalize, map } from 'rxjs';

import { CreatOrder } from './../service/creat-order';

/**
 *  Checkout component for handling the checkout process.
 */
@Component({
  selector: 'lib-checkout',
  imports: [Input, ReactiveFormsModule, Button, TextInput],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly creatOrder = inject(CreatOrder);
  private readonly router = inject(Router);
  id = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null }
  );

  isLoading = signal(false);
  checkoutForm = this.fb.group({
    shippingAddress: this.fb.group({
      details: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: ['', Validators.required],
    }),
    paymentMethod: ['cash', Validators.required],
  });

  /**
   *  Handles form submission for the checkout process.
   */
  onSubmitForm(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    const formValue = this.checkoutForm.getRawValue();
    this.isLoading.set(true);
    if (this.checkoutForm.get('paymentMethod')?.value === 'cash') {
      this.creatOrder
        .createCashOrder(this.id(), formValue)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/allorders']);
          },
        });
    } else if (this.checkoutForm.get('paymentMethod')?.value === 'visa') {
      this.creatOrder
        .createVisaOrder(this.id(), formValue)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
        });
    }
  }
}
