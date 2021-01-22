import { TestBed } from '@angular/core/testing';

import { SceneStateService } from './scene-state.service';

describe('SceneStateService', () => {
  let service: SceneStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
