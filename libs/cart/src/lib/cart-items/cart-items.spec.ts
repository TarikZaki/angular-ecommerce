import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItems } from './cart-items';

describe('CartItems', () => {
  let component: CartItems;
  let fixture: ComponentFixture<CartItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItems],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
