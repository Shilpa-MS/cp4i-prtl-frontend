import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneClickDeploymentComponent } from './one-click-deployment.component';

describe('OneClickDeploymentComponent', () => {
  let component: OneClickDeploymentComponent;
  let fixture: ComponentFixture<OneClickDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneClickDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneClickDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
