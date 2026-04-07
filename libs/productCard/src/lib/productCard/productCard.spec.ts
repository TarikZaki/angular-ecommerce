import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { product } from '@org/models';

import { ProductCard } from './productCard';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    const product: Partial<product> = {
      category: {
        image: '',
        _id: '',
        name: '',
        slug: '',
      },
      brand: {
        _id: '',
        image: '',
        name: '',
        slug: '',
      },
    };
    fixture.componentRef.setInput('product', product);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
