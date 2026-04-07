import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ControlsService } from './controls-service';
describe('ControlsService', () => {
  let service: ControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
