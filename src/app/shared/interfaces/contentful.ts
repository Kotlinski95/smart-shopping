import { Entry } from 'contentful';

export interface ContentfulState {
  pages: Array<ContentfulPage>;
}

export interface ContentfulPage {
  id: ContentfulContent;
  content?: Entry<any>;
  asset?: ContentfulAsset;
  loaded: boolean;
}

export interface ContentfulContent {
  entryID?: string;
  contentID?: string;
}

export interface ContentfulAsset {
  id: string;
  url: string;
}
