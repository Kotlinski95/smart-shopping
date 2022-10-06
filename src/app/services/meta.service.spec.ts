import { TestBed } from '@angular/core/testing';

import { MetaService } from './meta.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MetaServiceService', () => {
  let service: MetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(MetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
