import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNavHideComponent } from './navbar-nav-hide.component';

describe('NavbarNavHideComponent', () => {
  let component: NavbarNavHideComponent;
  let fixture: ComponentFixture<NavbarNavHideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarNavHideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNavHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
