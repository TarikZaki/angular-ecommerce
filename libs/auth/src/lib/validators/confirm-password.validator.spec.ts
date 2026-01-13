import { FormControl, FormGroup } from '@angular/forms';

import { confirmPasswordValidator } from './confirm-password.validator';

describe('confirmPasswordValidator', () => {
  let form: FormGroup;

  beforeEach(() => {
    form = new FormGroup(
      {
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      },
      {
        validators: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  });

  it('returns null when passwords match', () => {
    form.setValue({
      password: '123456',
      confirmPassword: '123456',
    });

    expect(form.errors).toBeNull();
  });

  it('sets misMatch error when passwords do not match', () => {
    form.setValue({
      password: '123456',
      confirmPassword: '000000',
    });

    expect(form.errors).toEqual({ misMatch: true });
    expect(form.get('confirmPassword')?.errors?.['misMatch']).toBe(true);
  });
});
