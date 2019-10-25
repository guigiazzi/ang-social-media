import { TestBed } from '@angular/core/testing';
import { OpenModalPeopleService } from './open-modal-people-service.service';

describe('OpenModalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenModalPeopleService = TestBed.get(OpenModalPeopleService);
    expect(service).toBeTruthy();
  });
});
