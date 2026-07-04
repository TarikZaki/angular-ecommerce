import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CreateCashOrders, CreateVisaOrders } from '@org/models';
import { of } from 'rxjs';

import { CreatOrder } from '../service/creat-order';
import { Checkout } from './checkout';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;
  let creatOrder: jest.Mocked<CreatOrder>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: CreatOrder,
          useValue: {
            createCashOrder: jest.fn(),
            createVisaOrder: jest.fn(),
          },
        },
      ],
    }).compileComponents();
    creatOrder = TestBed.inject(CreatOrder) as jest.Mocked<CreatOrder>;
    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmitForm();
    expect(creatOrder.createCashOrder).not.toHaveBeenCalled();
    expect(creatOrder.createVisaOrder).not.toHaveBeenCalled();
  });
  it('should call createCashOrder when payment method is cash', () => {
    jest
      .spyOn(creatOrder, 'createCashOrder')
      .mockReturnValue(of({} as CreateCashOrders));

    component.checkoutForm.setValue({
      shippingAddress: {
        details: 'test',
        phone: '01012345678',
        city: 'cairo',
      },
      paymentMethod: 'cash',
    });
    component.onSubmitForm();
    expect(creatOrder.createCashOrder).toHaveBeenCalled();
  });

  it('should call createCashOrder when payment method is cash', () => {
    const visaResponse = {
      status: 'success',
      session: {
        url: 'https://payment-gateway.test/session',
      },
    } as CreateVisaOrders;
    jest.spyOn(creatOrder, 'createVisaOrder').mockReturnValue(of(visaResponse));
    const windowOpenSpy = jest
      .spyOn(window, 'open')
      .mockImplementation(() => null);
    component.checkoutForm.setValue({
      shippingAddress: {
        details: 'test address',
        phone: '01012345678',
        city: 'cairo',
      },
      paymentMethod: 'visa',
    });
    component.onSubmitForm();
    expect(creatOrder.createVisaOrder).toHaveBeenCalled();
    expect(windowOpenSpy).toHaveBeenCalledWith(
      visaResponse.session.url,
      '_self'
    );
    windowOpenSpy.mockRestore();
  });
});
