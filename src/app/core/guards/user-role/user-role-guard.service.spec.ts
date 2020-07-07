import { TestBed } from '@angular/core/testing';

import { UserRoleGuardService } from './user-role-guard.service';

describe('UserRoleGuardService', () => {
  let service: UserRoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
