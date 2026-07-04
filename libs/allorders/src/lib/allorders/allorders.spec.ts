import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService, CartService } from '@org/services';

import { Allorders } from './allorders';

describe('Allorders', () => {
  let component: Allorders;
  let fixture: ComponentFixture<Allorders>;

  const mockAuthService = {
    decodeToken: jest.fn().mockReturnValue({ id: 'user123' }),
  };

  const mockCartService = {
    getUserOrders: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allorders],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Allorders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user orders on init', () => {
    expect(mockAuthService.decodeToken).toHaveBeenCalled();
    expect(mockCartService.getUserOrders).toHaveBeenCalledWith('user123');
  });
});
