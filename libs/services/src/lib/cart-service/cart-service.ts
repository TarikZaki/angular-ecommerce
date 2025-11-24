import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddtocartResponse, GetUserCart } from '@org/models';
import { Observable } from 'rxjs';

/**
 *  Cart service
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  /**
   *  Get logged user cart
   */
  GetLoggedUserCart(): Observable<GetUserCart> {
    return this.httpClient.get<GetUserCart>(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
  }

  /**
   *  Add product to cart
   */
  AddProductToCart(id: string): Observable<AddtocartResponse> {
    return this.httpClient.post<AddtocartResponse>(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      }
    );
  }
}
