import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import {
  CONFIG,
  ContentfulService,
} from 'src/app/shared/services/contentful.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  public contentfulConfig = CONFIG.contentTypeIds.termsAndConditions;
  public termsAndConditionsContent$: Observable<Entry<any>> | undefined;
  public termsAndConditionsImage$: Observable<string> | undefined;
  constructor(private contentfulService: ContentfulService) {}
  public ngOnInit(): void {
    this.termsAndConditionsContent$ = this.contentfulService.getContent(
      this.contentfulConfig.entryID,
      CONFIG.contentTypeIds.termsAndConditions.contentID
    );
    this.termsAndConditionsImage$ = this.contentfulService.getAsset(
      this.contentfulConfig.assetID
    );
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }
}
