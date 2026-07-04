import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { apiRes, Category } from '@org/models';

import { Categories } from './categories';
describe('Categories', () => {
  let service: Categories;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Categories);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all categories', () => {
    const mockResponse = {} as apiRes<Category>;
    service.getAllCategories().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
