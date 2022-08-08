import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductorderComponent } from './addproductorder.component';

describe('AddproductorderComponent', () => {
  let component: AddproductorderComponent;
  let fixture: ComponentFixture<AddproductorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
