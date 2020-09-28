import { TestBed } from '@angular/core/testing';

import { FreelancerActionsService } from './freelancer-actions.service';

describe('FreelancerActionsService', () => {
  let service: FreelancerActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreelancerActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
