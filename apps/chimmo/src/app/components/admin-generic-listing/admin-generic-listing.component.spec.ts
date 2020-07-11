import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenericListingComponent } from './admin-generic-listing.component';

describe('AdminGenericListingComponent', () => {
  let component: AdminGenericListingComponent;
  let fixture: ComponentFixture<AdminGenericListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGenericListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenericListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
