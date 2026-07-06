import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { apiRes, IProductsQueryParams, product } from '@org/models';

import { Products } from './products';

describe('Products', () => {
  let service: Products;
  let httpMock: HttpTestingController;

  const baseUrl = 'https://ecommerce.routemisr.com/api/v1/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Products);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products with no filters', () => {
    const mockResponse = {} as apiRes<product>;

    service.getProducts({}).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}?`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should include page, limit, and sort query params', () => {
    const filters: IProductsQueryParams = {
      page: 2,
      limit: 10,
      sort: '-price',
    };

    service.getProducts(filters).subscribe();

    const req = httpMock.expectOne(
      `${baseUrl}?page=2&limit=10&sort=-price`
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should include category filters', () => {
    service.getProducts({ category: ['cat1', 'cat2'] }).subscribe();

    const req = httpMock.expectOne(
      `${baseUrl}?category[in]=cat1&category[in]=cat2`
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should not include category param when category array is empty', () => {
    service.getProducts({ category: [], page: 1 }).subscribe();

    const req = httpMock.expectOne(`${baseUrl}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should include min and max price query params', () => {
    service.getProducts({ minPrice: 100, maxPrice: 500 }).subscribe();

    const req = httpMock.expectOne(
      `${baseUrl}?price[gte]=100&price[lte]=500`
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should include minPrice when it is zero', () => {
    service.getProducts({ minPrice: 0 }).subscribe();

    const req = httpMock.expectOne(`${baseUrl}?price[gte]=0`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should build query string with all filters', () => {
    const filters: IProductsQueryParams = {
      page: 1,
      limit: 20,
      sort: 'title',
      category: ['abc', 'def'],
      minPrice: 50,
      maxPrice: 200,
    };

    service.getProducts(filters).subscribe();

    const req = httpMock.expectOne(
      `${baseUrl}?page=1&limit=20&sort=title&category[in]=abc&category[in]=def&price[gte]=50&price[lte]=200`
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
