import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HideNavbarComponent } from './hide-navbar.component';

describe('HideNavbarComponent', () => {
  let component: HideNavbarComponent;
  let fixture: ComponentFixture<HideNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HideNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
