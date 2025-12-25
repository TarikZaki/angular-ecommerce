import { TestBed } from '@angular/core/testing';

import { CreatOrder } from './creat-order';

describe('CreatOrder', () => {
  let service: CreatOrder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatOrder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
