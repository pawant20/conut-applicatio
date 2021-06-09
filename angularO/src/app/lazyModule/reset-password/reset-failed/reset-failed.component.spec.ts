import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFailedComponent } from './reset-failed.component';

describe('ResetFailedComponent', () => {
  let component: ResetFailedComponent;
  let fixture: ComponentFixture<ResetFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
