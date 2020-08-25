import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConscienceComponent } from './conscience.component';

describe('ConscienceComponent', () => {
  let component: ConscienceComponent;
  let fixture: ComponentFixture<ConscienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConscienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConscienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
