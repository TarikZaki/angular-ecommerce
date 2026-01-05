import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductControls } from './product-controls';
describe('ProductControls', () => {
  let component: ProductControls;
  let fixture: ComponentFixture<ProductControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductControls],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductControls);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('count', 'tarek');
    fixture.componentRef.setInput('productId', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
