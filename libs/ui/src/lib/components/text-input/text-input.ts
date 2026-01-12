import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ErrorMessagePipe } from '../../pipes/error-message-pipe';

/**
 * Textarea component implementing ControlValueAccessor with built-in error display.
 */
@Component({
  selector: 'lib-text-input',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ErrorMessagePipe,
  ],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TextInput implements ControlValueAccessor {
  placeholder = input('');
  label = input('');
  rows = input();
  value = signal('');
  disabled = signal(false);
  ngControl = inject(NgControl, { optional: true, self: true });

  /**
   * Registers this component as a ControlValueAccessor if used within a form control.
   */
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Updates internal value and propagates changes to the form control.
   *
   * @param event - Input event emitted by the native textarea element.
   */
  onInputChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value.set(value);
    this.onChange?.(value);
  }

  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  /**
   * Marks the control as touched on blur.
   */
  onBlur() {
    this.onTouched?.();
  }

  /**
   * Writes an external value to the view.
   *
   * @param value - The value to set.
   */
  writeValue(value: string): void {
    this.value.set(value || '');
  }

  /**
   * Registers a callback to be triggered when the value changes.
   *
   * @param fn - Change propagation function.
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   *
   * @param fn - Touched propagation function.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Updates the disabled state of the control.
   *
   * @param isDisabled - Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /**
   * Whether the form control currently has validation errors and was interacted with.
   */
  get hasError(): boolean {
    return !!(
      this.ngControl?.control?.invalid &&
      (this.ngControl?.control?.dirty || this.ngControl?.control?.touched)
    );
  }
}
