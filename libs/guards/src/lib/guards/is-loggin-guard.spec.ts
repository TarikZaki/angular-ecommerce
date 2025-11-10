import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLogginGuard } from './is-loggin-guard';

describe('isLogginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLogginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
