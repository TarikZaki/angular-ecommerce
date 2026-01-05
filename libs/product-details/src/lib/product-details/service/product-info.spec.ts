import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductInfo } from './product-info';

describe('ProductInfo', () => {
  let service: ProductInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductInfo, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
