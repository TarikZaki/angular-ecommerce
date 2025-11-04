import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField);
    const confirmPassword = formGroup.get(confirmPasswordField);

    if (!password || !confirmPassword) return null;

    if (!password.value || !confirmPassword.value) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, misMatch: true });
      return { misMatch: true };
    } else {
      if (confirmPassword.errors) {
        const { misMatch, ...otherErrors } = confirmPassword.errors;
        confirmPassword.setErrors(
          Object.keys(otherErrors).length ? otherErrors : null
        );
      }
    }

    return null;
  };
}
