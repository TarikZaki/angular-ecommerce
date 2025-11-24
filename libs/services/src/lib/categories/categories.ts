import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiRes, Category } from '@org/models';
import { Observable } from 'rxjs';

/**
 *  Categories Service
 */
@Injectable({
  providedIn: 'root',
})
export class Categories {
  private readonly httpClient = inject(HttpClient);
  /**
   * Fetch all categories
   */
  getAllCategories(): Observable<apiRes<Category>> {
    return this.httpClient.get<apiRes<Category>>(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
}
