import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { AuthResponse, LoginRequest, RegisterRequest } from '../models/iauth';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Authentication service for handling user registration and login.
 */
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  /**
   * Sends a signup request.
   *
   * @param data - User registration payload.
   * @returns Observable that emits the authentication response.
   */
  registerForm(data: RegisterRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }

  /**
   * Sends a signin request.
   *
   * @param data - User login payload.
   * @returns Observable that emits the authentication response.
   */
  loginForm(data: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  /**
   * sign out function that delete token and navigate to login
   */
  signout(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
