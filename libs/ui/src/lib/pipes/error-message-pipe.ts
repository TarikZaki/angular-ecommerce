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
