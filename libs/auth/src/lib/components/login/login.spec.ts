import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@org/services';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

import { Login } from './login';

const mockRouter = {
  navigate: jest.fn(),
};
const mockCookie = {
  set: jest.fn(),
};
const mockAuthService = {
  loginForm: jest.fn(),
};

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: CookieService, useValue: mockCookie },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call login api if form invalid', () => {
    component.onSubmitForm();
    expect(mockAuthService.loginForm).not.toHaveBeenCalled();
  });
  it('should call login api and navigate on success', () => {
    mockAuthService.loginForm.mockReturnValue(of({ token: '123' }));
    component.loginForm.setValue({
      email: 'test@mail.com',
      password: '123456',
    });
    component.onSubmitForm();
    expect(mockAuthService.loginForm).toHaveBeenCalledWith({
      email: 'test@mail.com',
      password: '123456',
    });
    expect(mockCookie.set).toHaveBeenCalledWith('token', '123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
