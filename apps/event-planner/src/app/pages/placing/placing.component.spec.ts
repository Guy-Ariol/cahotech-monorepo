import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacingComponent } from './placing.component';

describe('PlacingComponent', () => {
  let component: PlacingComponent;
  let fixture: ComponentFixture<PlacingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
