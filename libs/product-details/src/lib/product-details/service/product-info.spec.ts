import { TestBed } from '@angular/core/testing';

import { ProductInfo } from './product-info';

describe('ProductInfo', () => {
  let service: ProductInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
