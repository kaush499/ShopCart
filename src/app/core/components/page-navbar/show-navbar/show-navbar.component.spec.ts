import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNavbarComponent } from './show-navbar.component';

describe('ShowNavbarComponent', () => {
  let component: ShowNavbarComponent;
  let fixture: ComponentFixture<ShowNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
