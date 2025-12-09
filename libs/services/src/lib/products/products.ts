import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiRes, product } from '@org/models';
import { Observable } from 'rxjs';

/**
 *  Products Service
 */
@Injectable({
  providedIn: 'root',
})
export class Products {
  private readonly httpClient = inject(HttpClient);
  /**
   *  get all products
   */
  getAllProducts(page = 1, limit = 10): Observable<apiRes<product>> {
    return this.httpClient.get<apiRes<product>>(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`
    );
  }

  /**
   * get Category Products
   */
  getCategoryProducts(
    ids: string[],
    page = 1,
    limit = 10
  ): Observable<apiRes<product>> {
    const query = ids.map((id) => `category[in]=${id}`).join('&');

    return this.httpClient.get<apiRes<product>>(
      `https://ecommerce.routemisr.com/api/v1/products?${query}&page=${page}&limit=${limit}`
    );
  }
}
