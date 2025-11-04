import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ErrorMessagePipe } from '../../pipes/error-message-pipe';
@Component({
  selector: 'lib-input',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ErrorMessagePipe,
  ],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Input implements ControlValueAccessor {
  typeInput = input('text', {});
  placeholder = input('');
  label = input('');
  value = signal('');
  disabled = signal(false);
  ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  hide: WritableSignal<boolean> = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange?.(value);
  }
  private onChange?: (value: any) => void;
  private onTouched?: () => void;

  onBlur() {
    this.onTouched?.();
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  get hasError(): boolean {
    return !!(
      this.ngControl?.control?.invalid &&
      (this.ngControl?.control?.dirty || this.ngControl?.control?.touched)
    );
  }
}
