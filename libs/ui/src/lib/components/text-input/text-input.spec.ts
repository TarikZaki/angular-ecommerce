import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TextInput } from './text-input';

/**
 * host component to be able to test the ngControl
 */
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TextInput],
  template: `
    <form [formGroup]="form">
      <lib-text-input
        label="Message"
        placeholder="Write here"
        [rows]="3"
        formControlName="text"
      ></lib-text-input>
    </form>
  `,
})
class HostComponent {
  form = new FormGroup({
    text: new FormControl(''),
  });
}

describe('TextInput (with Host)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let textInputcmp: TextInput;
  let textarea: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    const textInputDebug = fixture.debugElement.query(By.directive(TextInput));
    textInputcmp = textInputDebug.componentInstance;
    textarea = textInputDebug.nativeElement.querySelector('textarea');
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should write value from form to textarea', () => {
    host.form.get('text')!.setValue('Hello World');
    fixture.detectChanges();

    expect(textarea.value).toBe('Hello World');
  });

  it('should update form control when typing', () => {
    textarea.value = 'Typing...';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.form.get('text')!.value).toBe('Typing...');
  });

  it('should mark control as touched on blur', () => {
    expect(host.form.get('text')!.touched).toBeFalsy();

    textarea.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(host.form.get('text')!.touched).toBeTruthy();
  });

  it('should disable textarea when form control is disabled', () => {
    host.form.get('text')!.disable();
    fixture.detectChanges();

    expect(textarea.disabled).toBeTruthy();
  });

  it('should return true for hasError when control is invalid and touched', () => {
    host.form.get('text')!.setErrors({ required: true });
    host.form.get('text')!.markAsTouched();
    fixture.detectChanges();

    expect(textInputcmp.hasError).toBeTruthy();
  });

  it('should return false for hasError when control is valid', () => {
    host.form.get('text')!.setErrors(null);
    fixture.detectChanges();

    expect(textInputcmp.hasError).toBeFalsy();
  });
});
