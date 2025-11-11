import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: false,
})
/**
 * Pipe that converts Angular form ValidationErrors into user-friendly messages.
 */
export class ErrorMessagePipe implements PipeTransform {
  /**
   * Builds a human-readable error message string based on Angular form ValidationErrors.
   *
   * @param errors - Validation errors object from a form control.
   * @param fieldLabel - A friendly field label used in messages.
   * @returns A formatted string of error messages, or an empty string when no errors.
   */
  transform(
    errors: ValidationErrors | null | undefined,
    fieldLabel = 'This field'
  ): string {
    if (!errors) return '';

    const messages: string[] = [];

    if (errors['required']) {
      messages.push(`${fieldLabel} is required`);
    }

    if (errors['email']) {
      messages.push('Please enter a valid email address');
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      messages.push(
        `${fieldLabel} must be at least ${requiredLength} characters`
      );
    }

    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      messages.push(
        `${fieldLabel} must not exceed ${requiredLength} characters`
      );
    }

    if (errors['pattern']) {
      messages.push(`Invalid ${fieldLabel.toLowerCase()} format`);
    }

    if (errors['misMatch']) {
      messages.push('Passwords do not match');
    }

    // ✅ لو فيه error مش معروف
    if (messages.length === 0) {
      messages.push('Invalid input');
    }

    // لو فيه أكثر من error، نعرضهم مفصولين بـ سطر جديد
    return messages.join('\n ');
  }
}
