import { TestBed } from '@angular/core/testing';

import { ReadProjectService } from './read-project.service';

describe('ReadProjectService', () => {
  let service: ReadProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
