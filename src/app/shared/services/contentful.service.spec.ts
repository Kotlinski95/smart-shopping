import { TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { ContentfulService } from './contentful.service';

describe('ContentfulService', () => {
  let service: ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    });
    service = TestBed.inject(ContentfulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
