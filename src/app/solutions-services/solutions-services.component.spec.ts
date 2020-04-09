import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsServicesComponent } from './solutions-services.component';

describe('SolutionsServicesComponent', () => {
  let component: SolutionsServicesComponent;
  let fixture: ComponentFixture<SolutionsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
