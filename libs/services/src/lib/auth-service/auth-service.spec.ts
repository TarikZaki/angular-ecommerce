import { provideHttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginRequest, RegisterRequest } from '@org/models';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CookieService,
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send register request', () => {
    const payload = {} as RegisterRequest;

    service.registerForm(payload).subscribe();

    const req = httpMock.expectOne(
      'https://ecommerce.routemisr.com/api/v1/auth/signup'
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush({});
  });

  it('should send login request', () => {
    const payload = {} as LoginRequest;

    service.loginForm(payload).subscribe();

    const req = httpMock.expectOne(
      'https://ecommerce.routemisr.com/api/v1/auth/signin'
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({});
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should delete token and navigate to login on signout', () => {
    const deleteSpy = jest.spyOn(cookieService, 'delete');
    const navigateSpy = jest.spyOn(router, 'navigate');

    service.signout();

    expect(deleteSpy).toHaveBeenCalledWith('token');
    expect(service.isLoggedIn()).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
  it('should return true when verifyToken succeeds', () => {
    service.verifyToken().subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyToken'
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('should signout and return false when verifyToken fails', () => {
    const signoutSpy = jest.spyOn(service, 'signout');

    service.verifyToken().subscribe((result) => {
      expect(result).toBeFalsy();
    });

    const req = httpMock.expectOne(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyToken'
    );

    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(signoutSpy).toHaveBeenCalled();
  });
});
