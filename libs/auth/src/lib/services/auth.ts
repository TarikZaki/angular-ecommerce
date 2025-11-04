import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RegisterRequest, RegisterResponse } from '../models/iauth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);

  registerForm(data: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
}
