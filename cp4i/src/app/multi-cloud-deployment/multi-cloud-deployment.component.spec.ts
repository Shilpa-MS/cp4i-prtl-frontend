import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCloudDeploymentComponent } from './multi-cloud-deployment.component';

describe('MultiCloudDeploymentComponent', () => {
  let component: MultiCloudDeploymentComponent;
  let fixture: ComponentFixture<MultiCloudDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCloudDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCloudDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
