import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiSingleRes, product } from '@org/models';
import { Observable } from 'rxjs';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class ProductInfo {
  private readonly httpClient = inject(HttpClient);

  /**
   * get product details by id
   */
  getProductDetails(id: string | null): Observable<ApiSingleRes<product>> {
    return this.httpClient.get<ApiSingleRes<product>>(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
}
