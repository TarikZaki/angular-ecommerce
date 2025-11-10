import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthResponse, LoginRequest, RegisterRequest } from '../models/iauth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);

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
}
