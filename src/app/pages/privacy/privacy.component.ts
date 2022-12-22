import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Entry } from 'contentful';
import { Observable, Subscription } from 'rxjs';
import { ContentfulPage } from 'src/app/shared/interfaces/contentful';
import { Language } from 'src/app/shared/interfaces/language';
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
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit, OnDestroy {
  public contentfulConfig = CONFIG;
  public privacyContent$: Observable<ContentfulPage | undefined> | undefined;
  public isPrivacyContentLoaded$: Observable<boolean> = new Observable();
  private subscriptions: Subscription = new Subscription();
  constructor(
    private contentfulService: ContentfulService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.getPrivacyPageContent();
    this.privacyContent$ = this.store.pipe(
      select(state =>
        getContentfulContent(state, CONFIG.contentTypeIds.privacy.entryID)
      )
    );

    this.isPrivacyContentLoaded$ = this.store.pipe(
      select(state =>
        getContentfulContentLoaded(state, CONFIG.contentTypeIds.privacy.entryID)
      )
    );

    this.subscriptions.add(
      this.store.select(getLanguage).subscribe(() => {
        this.getPrivacyPageContent();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }

  private getPrivacyPageContent() {
    this.store.dispatch(
      ContentfulActions.getContentfulContent({
        entryID: CONFIG.contentTypeIds.privacy.entryID,
        contentID: CONFIG.contentTypeIds.privacy.contentID,
      })
    );
    this.store.dispatch(
      ContentfulActions.getContentfulAsset({
        entryID: CONFIG.contentTypeIds.privacy.entryID,
        assetID: CONFIG.contentTypeIds.privacy.assetID,
      })
    );
  }
}
