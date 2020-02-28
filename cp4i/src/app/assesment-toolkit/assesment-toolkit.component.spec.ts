import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentToolkitComponent } from './assesment-toolkit.component';

describe('AssesmentToolkitComponent', () => {
  let component: AssesmentToolkitComponent;
  let fixture: ComponentFixture<AssesmentToolkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentToolkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentToolkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
