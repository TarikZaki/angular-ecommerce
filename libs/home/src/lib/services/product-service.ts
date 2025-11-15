import { apiRes, product } from '@org/models';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  /***
   * get all products
   */
  getAllProducts(): Observable<apiRes<product>> {
    return this.httpClient.get<apiRes<product>>(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }
}
