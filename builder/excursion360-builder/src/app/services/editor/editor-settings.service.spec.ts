import { TestBed } from '@angular/core/testing';

import { EditorSettingsService } from './editor-settings.service';

describe('EditorSettingsService', () => {
  let service: EditorSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
