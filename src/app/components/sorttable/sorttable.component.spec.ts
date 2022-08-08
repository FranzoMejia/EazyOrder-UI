import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorttableComponent } from './sorttable.component';

describe('SorttableComponent', () => {
  let component: SorttableComponent;
  let fixture: ComponentFixture<SorttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorttableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
