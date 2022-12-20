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
import { getContentfulContent } from 'src/app/state/selectors/contentful.selectors';
@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
})
export class CookiesComponent implements OnInit {
  public contentfulConfig = CONFIG.contentTypeIds.cookies;
  public cookiesContent$: Observable<ContentfulPage | undefined> | undefined;
  constructor(
    private contentfulService: ContentfulService,
    private store: Store
  ) {}
  public ngOnInit(): void {
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
    this.cookiesContent$ = this.store.pipe(
      select(state =>
        getContentfulContent(state, CONFIG.contentTypeIds.cookies.entryID)
      )
    );
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }
}
