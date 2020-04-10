import { TestBed } from '@angular/core/testing';

import { Modal.ServiceService } from './modal.service.service';

describe('Modal.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Modal.ServiceService = TestBed.get(Modal.ServiceService);
    expect(service).toBeTruthy();
  });
});
