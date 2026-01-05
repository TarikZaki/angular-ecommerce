import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBox } from './item-box';

describe('ItemBox', () => {
  let component: ItemBox;
  let fixture: ComponentFixture<ItemBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemBox],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
