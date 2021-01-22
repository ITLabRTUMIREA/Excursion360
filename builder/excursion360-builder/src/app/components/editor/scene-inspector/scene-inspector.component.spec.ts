import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneInspectorComponent } from './scene-inspector.component';

describe('SceneInspectorComponent', () => {
  let component: SceneInspectorComponent;
  let fixture: ComponentFixture<SceneInspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneInspectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
