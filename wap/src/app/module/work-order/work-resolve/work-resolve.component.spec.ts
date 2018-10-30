/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkResolveComponent } from './work-resolve.component';

describe('WorkResolveComponent', () => {
  let component: WorkResolveComponent;
  let fixture: ComponentFixture<WorkResolveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkResolveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
