import { TestBed } from '@angular/core/testing';

import { TagsService } from '../shared/services/tags.service';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
