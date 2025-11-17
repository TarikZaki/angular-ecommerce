import { HttpInterceptorFn } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { headerInterceptor } from './header-interceptor';

describe('headerInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => headerInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
