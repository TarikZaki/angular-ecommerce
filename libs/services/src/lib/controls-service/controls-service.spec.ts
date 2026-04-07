import { TestBed } from '@angular/core/testing';
import { CartProductItem, GetUserCart } from '@org/models';
import { of, Subject, throwError } from 'rxjs';

import { CartService } from '../cart-service/cart-service';
import { ControlsService } from './controls-service';

describe('ControlsService', () => {
  let service: ControlsService;
  let cartServiceMock: jest.Mocked<CartService>;

  beforeEach(() => {
    cartServiceMock = {
      GetLoggedUserCart: jest.fn(),
      UpdateProductQuantityInCart: jest.fn(),
      RemoveProductFromCart: jest.fn(),
      AddProductToCart: jest.fn(),
    } as unknown as jest.Mocked<CartService>;
    TestBed.configureTestingModule({
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    });
    service = TestBed.inject(ControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // loadCart
  it('should load cart and update signals', () => {
    const fakeRes = {
      data: { products: [] },
      numOfCartItems: 3,
    } as unknown as GetUserCart;
    cartServiceMock.GetLoggedUserCart.mockReturnValue(of(fakeRes));
    service.loadCart();
    expect(cartServiceMock.GetLoggedUserCart).toHaveBeenCalled();
    expect(service.cart()).toBe(fakeRes.data);
    expect(service.numOfCartItems()).toBe(fakeRes.numOfCartItems);
  });

  // loadCart (error)
  it('should reset cart and local products on error', () => {
    cartServiceMock.GetLoggedUserCart.mockReturnValue(
      throwError(() => new Error('Api error'))
    );
    service.loadCart();
    expect(service.cart()).toBeNull();
    expect(service.localCartProducts().size).toBe(0);
  });

  // incrementQuantity
  it('sets loading while updating quantity and clears after response', () => {
    const productId = 'prod-1';
    const currentCount = 2;
    const subject = new Subject<GetUserCart>();
    const fakeRes = {
      data: { products: [] },
      numOfCartItems: 1,
    } as unknown as GetUserCart;
    cartServiceMock.UpdateProductQuantityInCart.mockReturnValue(
      subject.asObservable()
    );
    service.incrementQuantity(productId, currentCount);
    expect(service.isProductLoading(productId)).toBe(true);
    expect(cartServiceMock.UpdateProductQuantityInCart).toHaveBeenCalledWith(
      productId,
      currentCount + 1
    );
    subject.next(fakeRes);
    subject.complete();
    expect(service.isProductLoading(productId)).toBe(false);
    expect(service.numOfCartItems()).toBe(fakeRes.numOfCartItems);
  });

  it('removes product and updates cart', () => {
    const productId = 'prod-2';
    const fakeRes = {
      data: { products: [] },
      numOfCartItems: 0,
    } as unknown as GetUserCart;
    cartServiceMock.RemoveProductFromCart.mockReturnValue(of(fakeRes));
    service.removeProduct(productId);
    expect(cartServiceMock.RemoveProductFromCart).toHaveBeenCalledWith(
      productId
    );
    expect(service.cart()).toBe(fakeRes.data);
    expect(service.numOfCartItems()).toBe(fakeRes.numOfCartItems);
  });

  // isProductLoading
  it('should return true if product is loading', () => {
    service.loadingProductId.set('p1');
    expect(service.isProductLoading('p1')).toBe(true);
    expect(service.isProductLoading('p2')).toBe(false);
  });
});
