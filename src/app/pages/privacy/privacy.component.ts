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
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  public contentfulConfig = CONFIG;
  public privacyContent$: Observable<ContentfulPage | undefined> | undefined;
  constructor(
    private contentfulService: ContentfulService,
    private store: Store
  ) {}

  public ngOnInit(): void {
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
    this.privacyContent$ = this.store.pipe(
      select(state =>
        getContentfulContent(state, CONFIG.contentTypeIds.privacy.entryID)
      )
    );
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }
}
