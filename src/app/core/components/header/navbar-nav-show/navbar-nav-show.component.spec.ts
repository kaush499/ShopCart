import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNavShowComponent } from './navbar-nav-show.component';

describe('NavbarNavShowComponent', () => {
  let component: NavbarNavShowComponent;
  let fixture: ComponentFixture<NavbarNavShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarNavShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNavShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
