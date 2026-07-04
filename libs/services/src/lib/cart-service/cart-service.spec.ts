import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AddtocartResponse, GetUserCart, Order } from '@org/models';

import { CartService } from './cart-service';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // make sure no pending HTTP requests
    httpMock.verify();
  });
  // Arrange
  // Act
  // Assert

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get logged user cart', () => {
    const mockResponse = {} as GetUserCart;
    service.GetLoggedUserCart().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should add product to cart', () => {
    const productId = '123';
    const mockResponse = {} as AddtocartResponse;

    service.AddProductToCart(productId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ productId });

    req.flush(mockResponse);
  });

  it('should remove product from cart', () => {
    // 🔹 ARRANGE
    const productId = '123';
    const mockResponse = {} as GetUserCart;

    // 🔹 ACT
    service.RemoveProductFromCart(productId).subscribe((res) => {
      // 🔹 ASSERT
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(mockResponse);
  });

  it('should update product quantity in cart', () => {
    // 🔹 ARRANGE
    const productId = '123';
    const count = 3;
    const mockResponse = {} as GetUserCart;

    // 🔹 ACT
    service.UpdateProductQuantityInCart(productId, count).subscribe((res) => {
      // 🔹 ASSERT
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ count });

    req.flush(mockResponse);
  });

  it('should get user orders as a raw array', () => {
    const userId = '6428ebc6dc1175abc65ca0b9';
    const mockOrders = [{ _id: 'order1' }] as Order[];

    service.getUserOrders(userId).subscribe((res) => {
      expect(res).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockOrders);
  });
});
