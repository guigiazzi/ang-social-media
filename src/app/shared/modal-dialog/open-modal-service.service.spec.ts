import { TestBed } from '@angular/core/testing';

import { OpenModalServiceService } from './open-modal-service.service';

describe('OpenModalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenModalServiceService = TestBed.get(OpenModalServiceService);
    expect(service).toBeTruthy();
  });
});
