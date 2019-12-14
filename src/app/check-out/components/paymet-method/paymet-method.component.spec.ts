import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetMethodComponent } from './paymet-method.component';

describe('PaymetMethodComponent', () => {
  let component: PaymetMethodComponent;
  let fixture: ComponentFixture<PaymetMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymetMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymetMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
