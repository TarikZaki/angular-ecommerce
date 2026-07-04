import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Input } from './input';

/**
 * Host component to test Input with ngControl
 */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Input],
  template: `
    <form [formGroup]="form">
      <lib-input
        label="Password"
        placeholder="Enter password"
        typeInput="password"
        formControlName="password"
      ></lib-input>
    </form>
  `,
})
class HostComponent {
  form = new FormGroup({
    password: new FormControl('', Validators.required),
  });
}

describe('Input (with Host)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let inputCmp: Input;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const inputDebug = fixture.debugElement.query(By.directive(Input));

    inputCmp = inputDebug.componentInstance;
    inputEl = inputDebug.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(inputCmp).toBeTruthy();
  });

  it('should write value from form to input', () => {
    host.form.get('password')!.setValue('1234');
    fixture.detectChanges();

    expect(inputEl.value).toBe('1234');
  });

  it('should update form control when typing', () => {
    inputEl.value = 'secret';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.form.get('password')!.value).toBe('secret');
  });

  it('should mark control as touched on blur', () => {
    expect(host.form.get('password')!.touched).toBeFalsy();

    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(host.form.get('password')!.touched).toBeTruthy();
  });
  it('should disable input when form control is disabled', () => {
    host.form.get('password')!.disable();
    fixture.detectChanges();

    expect(inputEl.disabled).toBeTruthy();
  });
  it('should return true for hasError when invalid and touched', () => {
    host.form.get('password')!.markAsTouched();
    fixture.detectChanges();

    expect(inputCmp.hasError).toBeTruthy();
  });
  it('should return false for hasError when valid', () => {
    host.form.get('password')!.setValue('1234');
    fixture.detectChanges();

    expect(inputCmp.hasError).toBeFalsy();
  });
  it('should toggle hide when clickEvent is called', () => {
    expect(inputCmp.hide()).toBeTruthy();
    inputCmp.clickEvent(new MouseEvent('click'));
    expect(inputCmp.hide()).toBeFalsy();
  });
});
