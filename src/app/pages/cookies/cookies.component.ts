import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import {
  CONFIG,
  ContentfulService,
} from 'src/app/shared/services/contentful.service';
@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
})
export class CookiesComponent implements OnInit {
  public contentfulConfig = CONFIG.contentTypeIds.cookies;
  public cookiesContent$: Observable<Entry<any>> | undefined;
  public cookiesImage$: Observable<string> | undefined;
  constructor(private contentfulService: ContentfulService) {}
  public ngOnInit(): void {
    this.cookiesContent$ = this.contentfulService.getContent(
      this.contentfulConfig.entryID,
      CONFIG.contentTypeIds.cookies.contentID
    );
    this.cookiesImage$ = this.contentfulService.getAsset(
      this.contentfulConfig.assetID
    );
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }
}
