import { TestBed } from '@angular/core/testing';

import { WebstoryService } from './webstory.service';

describe('WebstoryService', () => {
  let service: WebstoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebstoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
