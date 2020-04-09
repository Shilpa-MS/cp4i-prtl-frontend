import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationPatternsComponent } from './integration-patterns.component';

describe('IntegrationPatternsComponent', () => {
  let component: IntegrationPatternsComponent;
  let fixture: ComponentFixture<IntegrationPatternsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationPatternsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationPatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
