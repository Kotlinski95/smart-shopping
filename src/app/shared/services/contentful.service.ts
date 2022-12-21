import { Injectable } from '@angular/core';
import { Asset, createClient, Entry } from 'contentful';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { AlertType } from '../interfaces/alert';
import { TranslateService } from '@ngx-translate/core';

export const CONFIG = {
  contentTypeIds: {
    privacy: {
      contentID: 'page',
      entryID: '6BJ5eHGnxoNnjmSVtwuCYP',
      assetID: '7r3e0zWurz7AzIl9zFrep1',
    },
    termsAndConditions: {
      contentID: 'page',
      entryID: '1aFzEqUhhIsN4wgafkGwqI',
      assetID: '6DUhkMAMj1tVxcFuhgF1Lm',
    },
    cookies: {
      contentID: 'page',
      entryID: '1kn9S1D2CaxQ6H1HSYiY9U',
      assetID: '7CF0sBNhPorIOqwnkjbYq5',
    },
    about: {
      contentID: 'aboutUs',
      entryID: '7KA45v1OIwBbVIeJRIX1zG',
      assetID: '5JmtA2XaAwAmqufNfm3LrR',
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private cdaClient = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
  });

  private translationSection = 'alert.contentful';

  constructor(
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  getContents(content_type: string, query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: content_type,
          },
          query
        )
      )
      .then(res => res.items);
  }
  getContent(id: string, content_type: string): Promise<Entry<unknown>> {
    return new Promise((resolve, reject) => {
      this.cdaClient
        .getEntries(
          Object.assign(
            {
              content_type: content_type,
            },
            { 'sys.id': id }
          )
        )
        .then(res => {
          return resolve(res.items[0]);
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.get_content_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }
  public getAssets(): Observable<any> {
    return from(
      this.cdaClient
        .getAssets()
        .then(function (assets) {
          return assets;
        })
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  public getAsset(assetId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.cdaClient
        .getAsset(assetId)
        .then(function (asset) {
          resolve(`https:${asset.fields.file.url}`);
          return `https:${asset.fields.file.url}`;
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.get_asset_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }

  public returnHtmlFromRichText(richText: any) {
    const options = {
      renderNode: {
        [INLINES.HYPERLINK]: (node: any) => {
          const value = node.content[0]['value'];
          const uri = node.data.uri;

          return `<a class="link" href="${uri}" target="_blank">${value}</a>`;
        },
        [BLOCKS.HEADING_2]: (node: any) => {
          const value = node.content[0]['value'];
          return `<h2>${value}</h2>`;
        },
      },
    };
    if (
      richText === undefined ||
      richText === null ||
      richText.nodeType !== 'document'
    ) {
      return '<p>Error</p>';
    }
    return documentToHtmlString(richText, options);
  }
}
