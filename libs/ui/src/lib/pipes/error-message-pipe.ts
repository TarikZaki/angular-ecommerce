import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
  pure: false,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(
    errors: ValidationErrors | null | undefined,
    fieldLabel = 'This field'
  ): string {
    if (!errors) return '';

    if (errors['required']) {
      return `${fieldLabel} is required`;
    }

    if (errors['email']) {
      return 'Please enter a valid email address';
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `${fieldLabel} must be at least ${requiredLength} characters`;
    }

    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `${fieldLabel} must not exceed ${requiredLength} characters`;
    }

    if (errors['pattern']) {
      return `Invalid ${fieldLabel.toLowerCase()} format`;
    }

    if (errors['misMatch']) {
      return 'Passwords do not match';
    }

    return 'Invalid input';
  }
}
