import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  getContent(id: string, content_type: string): Observable<Entry<any>> {
    return from(
      this.cdaClient
        .getEntries(
          Object.assign(
            {
              content_type: content_type,
            },
            { 'sys.id': id }
          )
        )
        .then(res => res.items[0])
    );
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

  public getAsset(assetId: string): Observable<string> {
    return from(
      this.cdaClient.getAsset(assetId).then(function (asset) {
        return `https:${asset.fields.file.url}`;
      })
    );
  }

  public returnHtmlFromRichText(richText: any) {
    const options = {
      renderNode: {
        [INLINES.HYPERLINK]: (node: any) => {
          const value = node.content[0]['value'];
          const uri = node.data.uri;

          return `<a class="link" href="${uri}" target="_blank">${value}</a>`;
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
