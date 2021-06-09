import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSuccessAlertComponent } from './error-success-alert.component';

describe('ErrorSuccessAlertComponent', () => {
  let component: ErrorSuccessAlertComponent;
  let fixture: ComponentFixture<ErrorSuccessAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorSuccessAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSuccessAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
