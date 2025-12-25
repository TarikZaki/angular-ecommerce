import { Component, inject, OnInit, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Button, Input } from '@org/ui';
import { finalize } from 'rxjs';

import { CreatOrder } from './../service/creat-order';

/**
 *
 */
@Component({
  selector: 'lib-checkout',
  imports: [Input, ReactiveFormsModule, Button],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly creatOrder = inject(CreatOrder);
  id: string | null = null;
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
   *  Initialize the component and retrieve the cart ID from the route.
   */
  ngOnInit(): void {
    this.getCartId();
  }

  /**
   *  Retrieves the product ID from the route parameters.
   */
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }
  /**
   *  Handles the submission of the checkout form.
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
        .createCashOrder(this.id, formValue)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            console.log();
          },
        });
    } else if (this.checkoutForm.get('paymentMethod')?.value === 'visa') {
      this.creatOrder
        .createVisaOrder(this.id, formValue)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url);
            }
          },
        });
    }
  }
}
