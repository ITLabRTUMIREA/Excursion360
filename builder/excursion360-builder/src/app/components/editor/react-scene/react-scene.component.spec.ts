import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactSceneComponent } from './react-scene.component';

describe('ReactSceneComponent', () => {
  let component: ReactSceneComponent;
  let fixture: ComponentFixture<ReactSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
