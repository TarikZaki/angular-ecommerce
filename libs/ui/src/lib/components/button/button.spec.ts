import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { By } from '@angular/platform-browser';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should reflect button type in the template', () => {
    // 1️⃣ Set the input value
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges(); // update the template

    // 2️⃣ Query the DOM
    const buttonEl: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    // 3️⃣ Assert the result
    expect(buttonEl.type).toBe('submit');
  });
});
