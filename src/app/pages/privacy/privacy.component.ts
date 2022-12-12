import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable, Subscription } from 'rxjs';
import {
  CONFIG,
  ContentfulService,
} from 'src/app/shared/services/contentful.service';
import { INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { SsrSupportService } from 'src/app/shared/services/ssr-support.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  public contentfulConfig = CONFIG;
  public privacyContent$: Observable<Entry<any>> | undefined;
  public privacyImage$: Observable<string> | undefined;
  private documentInner = this.ssrSupportService.getDocument();
  private subscription: Subscription = new Subscription();
  constructor(
    private contentfulService: ContentfulService,
    private ssrSupportService: SsrSupportService
  ) {}

  public ngOnInit(): void {
    this.privacyContent$ = this.contentfulService.getContent(
      CONFIG.contentTypeIds.privacy.entryID,
      CONFIG.contentTypeIds.privacy.contentID
    );

    // this.subscription.add(
    //   this.privacyContent$.subscribe(content => {
    //     content.fields.description.content.forEach((node: any) => {
    //       if (node.content) this.checkNodeForHyperLink(node);
    //     });
    //   })
    // );

    this.privacyImage$ = this.contentfulService.getAsset(
      CONFIG.contentTypeIds.privacy.assetID
    );
  }

  // public checkNodeForHyperLink(node: any): void {
  //   const hyperLinks = node.content.filter(
  //     (content: any) => content.nodeType === 'hyperlink'
  //   );
  //   for (const link of hyperLinks) {
  //     const el = this.documentInner.querySelectorAll(`.description a`);
  //   }
  // }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }
}
