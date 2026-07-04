import { ValidationErrors } from '@angular/forms';

import { ErrorMessagePipe } from './error-message-pipe';
describe('ErrorMessagePipe', () => {
  let pipe: ErrorMessagePipe;
  beforeEach(() => {
    pipe = new ErrorMessagePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string when errors is null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should return required error message', () => {
    const errors: ValidationErrors = { required: true };

    const result = pipe.transform(errors, 'Email');

    expect(result).toBe('Email is required');
  });

  it('should return email error message', () => {
    const errors: ValidationErrors = { email: true };

    const result = pipe.transform(errors, 'Email');

    expect(result).toBe('Please enter a valid email address');
  });
  it('should return minlength error message', () => {
    const errors: ValidationErrors = {
      minlength: { requiredLength: 8, actualLength: 3 },
    };

    const result = pipe.transform(errors, 'Password');

    expect(result).toBe('Password must be at least 8 characters');
  });
  it('should return maxlength error message', () => {
    const errors: ValidationErrors = {
      maxlength: { requiredLength: 10, actualLength: 15 },
    };

    const result = pipe.transform(errors, 'Username');

    expect(result).toBe('Username must not exceed 10 characters');
  });
  it('should return pattern error message', () => {
    const errors: ValidationErrors = {
      pattern: { requiredPattern: '.*', actualValue: '123' },
    };

    const result = pipe.transform(errors, 'Phone');

    expect(result).toBe('Invalid phone format');
  });
  it('should return mismatch error message', () => {
    const errors: ValidationErrors = { misMatch: true };

    const result = pipe.transform(errors);

    expect(result).toBe('Passwords do not match');
  });

  it('should return multiple error messages separated by new line', () => {
    const errors: ValidationErrors = {
      required: true,
      minlength: { requiredLength: 6, actualLength: 2 },
    };

    const result = pipe.transform(errors, 'Password');

    expect(result).toBe(
      'Password is required\n Password must be at least 6 characters'
    );
  });
  it('should return default error message for unknown errors', () => {
    const errors: ValidationErrors = { unknownError: true };

    const result = pipe.transform(errors, 'Field');

    expect(result).toBe('Invalid input');
  });
});
