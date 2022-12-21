import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulPage } from 'src/app/shared/interfaces/contentful';
import {
  CONFIG,
  ContentfulService,
} from 'src/app/shared/services/contentful.service';
import { ContentfulActions } from 'src/app/state/actions';
import {
  getContentfulContent,
  getContentfulContentLoaded,
} from 'src/app/state/selectors/contentful.selectors';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  public contentfulConfig = CONFIG.contentTypeIds.termsAndConditions;
  public termsAndConditionsContent$:
    | Observable<ContentfulPage | undefined>
    | undefined;
  public isTermsAndConditionsContentLoaded$: Observable<boolean> =
    new Observable();
  constructor(
    private contentfulService: ContentfulService,
    private store: Store
  ) {}
  public ngOnInit(): void {
    this.store.dispatch(
      ContentfulActions.getContentfulContent({
        entryID: CONFIG.contentTypeIds.termsAndConditions.entryID,
        contentID: CONFIG.contentTypeIds.termsAndConditions.contentID,
      })
    );
    this.store.dispatch(
      ContentfulActions.getContentfulAsset({
        entryID: CONFIG.contentTypeIds.termsAndConditions.entryID,
        assetID: CONFIG.contentTypeIds.termsAndConditions.assetID,
      })
    );
    this.termsAndConditionsContent$ = this.store.pipe(
      select(state =>
        getContentfulContent(
          state,
          CONFIG.contentTypeIds.termsAndConditions.entryID
        )
      )
    );
    this.isTermsAndConditionsContentLoaded$ = this.store.pipe(
      select(state =>
        getContentfulContentLoaded(
          state,
          CONFIG.contentTypeIds.termsAndConditions.entryID
        )
      )
    );
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }
}
