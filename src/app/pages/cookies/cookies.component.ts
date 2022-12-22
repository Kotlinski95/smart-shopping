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
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
})
export class CookiesComponent implements OnInit, OnDestroy {
  public contentfulConfig = CONFIG.contentTypeIds.cookies;
  public cookiesContent$: Observable<ContentfulPage | undefined> | undefined;
  public isCookiesContentLoaded$: Observable<boolean> = new Observable();
  private subscriptions: Subscription = new Subscription();
  constructor(
    private contentfulService: ContentfulService,
    private store: Store
  ) {}
  public ngOnInit(): void {
    this.getCookiesPageContent();
    this.cookiesContent$ = this.store.pipe(
      select(state =>
        getContentfulContent(state, CONFIG.contentTypeIds.cookies.entryID)
      )
    );
    this.isCookiesContentLoaded$ = this.store.pipe(
      select(state =>
        getContentfulContentLoaded(state, CONFIG.contentTypeIds.cookies.entryID)
      )
    );

    this.subscriptions.add(
      this.store.select(getLanguage).subscribe(() => {
        this.getCookiesPageContent();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }

  private getCookiesPageContent() {
    this.store.dispatch(
      ContentfulActions.getContentfulContent({
        entryID: CONFIG.contentTypeIds.cookies.entryID,
        contentID: CONFIG.contentTypeIds.cookies.contentID,
      })
    );
    this.store.dispatch(
      ContentfulActions.getContentfulAsset({
        entryID: CONFIG.contentTypeIds.cookies.entryID,
        assetID: CONFIG.contentTypeIds.cookies.assetID,
      })
    );
  }
}
