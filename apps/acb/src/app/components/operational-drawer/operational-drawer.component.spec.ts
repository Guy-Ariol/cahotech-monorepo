import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDrawerComponent } from './operational-drawer.component';

describe('OperationalDrawerComponent', () => {
  let component: OperationalDrawerComponent;
  let fixture: ComponentFixture<OperationalDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationalDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
