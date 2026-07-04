import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, LoginRequest, RegisterRequest } from '@org/models';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of, tap } from 'rxjs';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly getToken = this.cookieService.get('token');

  isLoggedIn = signal<boolean>(this.hasValidToken());

  /**
   *  Checks if a valid authentication token exists.
   */
  private hasValidToken(): boolean {
    const token = this.cookieService.get('token');
    return !!token;
  }

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
    return this.httpClient
      .post<AuthResponse>(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        data
      )
      .pipe(
        tap(() => {
          this.isLoggedIn.set(true);
        })
      );
  }

  /**
   * sign out function that delete token and navigate to login
   */
  signout(): void {
    this.cookieService.delete('token');
    this.isLoggedIn.set(false);
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
}
