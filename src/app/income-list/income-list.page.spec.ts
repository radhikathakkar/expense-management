import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeListPage } from './income-list.page';

describe('IncomeListPage', () => {
  let component: IncomeListPage;
  let fixture: ComponentFixture<IncomeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
