import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button, Input } from '@org/ui';
@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule, Input, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private readonly fb = inject(FormBuilder);

  registerForm!: FormGroup;

  initForm() {
    this.registerForm = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        rePassword: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      { validators: this.confirmPassword }
    );
  }

  ngOnInit() {
    this.initForm();
  }
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { misMatch: true };
  }
  onSubmitForm() {
    // if (this.registerForm.valid) {
    // }
    console.log(this.registerForm);
  }
}
