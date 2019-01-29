import { TestBed } from '@angular/core/testing';

import { SavedataService } from './savedata.service';

describe('SavedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavedataService = TestBed.get(SavedataService);
    expect(service).toBeTruthy();
  });
});
