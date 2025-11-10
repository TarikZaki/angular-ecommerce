import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { AuthResponse, LoginRequest, RegisterRequest } from '../models/iauth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data: RegisterRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }

  loginForm(data: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  signout(): void {
    // remove token
    this.cookieService.delete('token');
    // navigate login
    this.router.navigate(['/login']);
  }
}
