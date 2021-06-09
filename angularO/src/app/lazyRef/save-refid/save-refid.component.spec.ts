import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRefidComponent } from './save-refid.component';

describe('SaveRefidComponent', () => {
  let component: SaveRefidComponent;
  let fixture: ComponentFixture<SaveRefidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRefidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRefidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
