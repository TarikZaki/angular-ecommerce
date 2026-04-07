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
/**
 *
 */
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
/**
 * Form input component implementing ControlValueAccessor with built-in error display.
 */
export class Input implements ControlValueAccessor {
  typeInput = input('text', {});
  placeholder = input('');
  label = input('');
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

  hide: WritableSignal<boolean> = signal(true);
  /**
   * Toggles password visibility and stops event propagation.
   *
   * @param event - Mouse click event from the toggle button.
   */
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  /**
   * Updates internal value and propagates changes to the form control.
   *
   * @param event - Input event emitted by the native input element.
   */
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
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
