import { TestBed } from '@angular/core/testing';

import { SsrSupportService } from './ssr-support.service';

describe('SsrSupportService', () => {
  let service: SsrSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsrSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
