import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContentfulState } from 'src/app/shared/interfaces/contentful';

const getConsentsState = createFeatureSelector<ContentfulState>('Contentful');

export const getContentfulContent = createSelector(
  getConsentsState,
  (state: ContentfulState, entryID: string) =>
    state && state.pages?.filter(page => page.id.entryID === entryID)[0]
);
