import { TestBed } from '@angular/core/testing';

import { GlobalCompilService } from './global-compil.service';

describe('GlobalCompilService', () => {
  let service: GlobalCompilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCompilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
