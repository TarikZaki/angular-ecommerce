import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiRes, IProductsQueryParams, product } from '@org/models';
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
  getProducts(filters: IProductsQueryParams): Observable<apiRes<product>> {
    const params: string[] = [];

    if (filters.page) {
      params.push(`page=${filters.page}`);
    }

    if (filters.limit) {
      params.push(`limit=${filters.limit}`);
    }
    if (filters.sort) {
      params.push(`sort=${filters.sort}`);
    }
    if (filters.category?.length) {
      const categoryQuery = filters.category
        .map((id) => `category[in]=${id}`)
        .join('&');
      params.push(categoryQuery);
    }

    if (filters.minPrice !== undefined) {
      params.push(`price[gte]=${filters.minPrice}`);
    }
    if (filters.maxPrice !== undefined) {
      params.push(`price[lte]=${filters.maxPrice}`);
    }

    const queryString = params.join('&');
    return this.httpClient.get<apiRes<product>>(
      `https://ecommerce.routemisr.com/api/v1/products?${queryString}`
    );
  }
}
