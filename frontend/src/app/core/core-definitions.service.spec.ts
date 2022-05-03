import { TestBed } from '@angular/core/testing';

import { CoreDefinitionsService } from './core-definitions.service';

describe('CoreDefinitionsService', () => {
  let service: CoreDefinitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreDefinitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
