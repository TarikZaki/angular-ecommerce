import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@org/services';
import { of } from 'rxjs';

import { Register } from './register';

const mockAuthService = {
  registerForm: jest.fn(),
};

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create register form with all controls',()=>{
    expect(component.registerForm).toBeTruthy();
    const controls = component.registerForm.controls

    expect(controls.name).toBeTruthy()
    expect(controls.email).toBeTruthy()
    expect(controls.password).toBeTruthy()
    expect(controls.rePassword).toBeTruthy()
    expect(controls.phone).toBeTruthy()
  })

  it('should make form as touched if form is invalid' , ()=>{
    const spy = jest.spyOn(component.registerForm,'markAllAsTouched')
  
    component.onSubmitForm();

    expect(spy).toHaveBeenCalled();
    expect(mockAuthService.registerForm).not.toHaveBeenCalled();
  })

  /**
   *fill form by helper function
   */
  function fillValidForm(component: Register) {
  component.registerForm.setValue({
    name: 'Tarek',
    email: 'tarek@test.com',
    password: '123456',
    rePassword: '123456',
    phone: '01012345678',
  });
}

it('should call register service and navigate on success', () => {
  const router = TestBed.inject(Router);
  const navigateSpy = jest.spyOn(router, 'navigate');

  mockAuthService.registerForm.mockReturnValue(of({}));

  fillValidForm(component);
  component.onSubmitForm();

  expect(mockAuthService.registerForm).toHaveBeenCalled();
  expect(component.isLoading()).toBe(false);
  expect(navigateSpy).toHaveBeenCalledWith(['/login']);
});
});
