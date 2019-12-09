import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressItemComponent } from './shipping-address-item.component';

describe('ShippingAddressItemComponent', () => {
  let component: ShippingAddressItemComponent;
  let fixture: ComponentFixture<ShippingAddressItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAddressItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
