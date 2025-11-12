import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of } from 'rxjs';

import {
  AuthResponse,
  DecodedToken,
  LoginRequest,
  RegisterRequest,
} from '../models/iauth';

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
  private readonly getToken = this.cookieService.get('token');

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

  /**
   *verify is token valid
   */
  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken')
      .pipe(
        map(() => true),
        catchError(() => {
          this.signout();
          return of(false);
        })
      );
  }
  /**
   * decode token to get UserId
   */
  decodeToken(): DecodedToken | null {
    try {
      const token = this.getToken;
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch {
      this.signout();
      return null;
    }
  }
}
