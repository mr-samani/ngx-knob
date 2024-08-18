import { TestBed } from '@angular/core/testing';

import { NgxKnobService } from './ngx-knob.service';

describe('NgxKnobService', () => {
  let service: NgxKnobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxKnobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
