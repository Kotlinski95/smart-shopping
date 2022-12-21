import { createAction, props } from '@ngrx/store';
import { Entry } from 'contentful';

export const getContentfulContent = createAction(
  '[Contentful] Get contentful content',
  props<{ entryID: string; contentID: string }>()
);

export const getContentfulContentSuccess = createAction(
  '[Contentful] Get contentful content - success',
  props<{ entryID: string; content: Entry<any> }>()
);

export const getContentfulContentFailure = createAction(
  '[Contentful] Get contentful content - failure',
  props<{ error: string }>()
);

export const getContentfulAsset = createAction(
  '[Contentful] Get contentful asset',
  props<{ entryID: string; assetID: string }>()
);

export const getContentfulAssetSuccess = createAction(
  '[Contentful] Get contentful asset - success',
  props<{ entryID: string; assetUrl: string }>()
);

export const getContentfulAssetFailure = createAction(
  '[Contentful] Get contentful asset - failure',
  props<{ error: string }>()
);
