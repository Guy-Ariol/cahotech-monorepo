import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCatalogComponent } from './new-catalog.component';

describe('NewCatalogComponent', () => {
  let component: NewCatalogComponent;
  let fixture: ComponentFixture<NewCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
