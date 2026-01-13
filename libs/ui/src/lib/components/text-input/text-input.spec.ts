import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInput } from './text-input';
describe('TextInput', () => {
  let component: TextInput;
  let fixture: ComponentFixture<TextInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInput],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(TextInput);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
