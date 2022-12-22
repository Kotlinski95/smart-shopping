import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Entry } from 'contentful';
import { Observable, Subscription } from 'rxjs';
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
import { getLanguage } from 'src/app/state/selectors/language.selectors';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {
  public contentfulConfig = CONFIG.contentTypeIds.termsAndConditions;
  public termsAndConditionsContent$:
    | Observable<ContentfulPage | undefined>
    | undefined;
  public isTermsAndConditionsContentLoaded$: Observable<boolean> =
    new Observable();
  private subscriptions: Subscription = new Subscription();
  constructor(
    private contentfulService: ContentfulService,
    private store: Store
  ) {}
  public ngOnInit(): void {
    this.getTermsAndConditionsPageContent();
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

    this.subscriptions.add(
      this.store.select(getLanguage).subscribe(() => {
        this.getTermsAndConditionsPageContent();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }

  private getTermsAndConditionsPageContent() {
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
  }
}
