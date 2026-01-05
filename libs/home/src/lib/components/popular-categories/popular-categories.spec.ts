import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCategories } from './popular-categories';

describe('PopularCategories', () => {
  let component: PopularCategories;
  let fixture: ComponentFixture<PopularCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCategories],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
