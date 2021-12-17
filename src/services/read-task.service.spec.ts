import { TestBed } from '@angular/core/testing';

import { ReadTaskService } from './read-task.service';

describe('ReadTaskService', () => {
  let service: ReadTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
