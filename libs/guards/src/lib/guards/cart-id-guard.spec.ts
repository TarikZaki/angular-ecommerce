import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cartIdGuard } from './cart-id-guard';

describe('cartIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cartIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
