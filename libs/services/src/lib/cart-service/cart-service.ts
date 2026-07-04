import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddtocartResponse, GetUserCart, Order } from '@org/models';
import { map, Observable } from 'rxjs';

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

  /**
   *  Remove product from cart
   */
  RemoveProductFromCart(id: string): Observable<GetUserCart> {
    return this.httpClient.delete<GetUserCart>(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }

  /**
   *  Update product quantity in cart
   */
  UpdateProductQuantityInCart(
    id: string,
    count: number
  ): Observable<GetUserCart> {
    return this.httpClient.put<GetUserCart>(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count }
    );
  }

  /**
   * Get all orders for a specific user.
   */
  getUserOrders(userId: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[] | { data: Order[] }>(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      )
      .pipe(
        map((res) => (Array.isArray(res) ? res : (res.data ?? [])))
      );
  }
}
