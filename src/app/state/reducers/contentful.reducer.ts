import { createReducer, on } from '@ngrx/store';
import { assert } from 'console';
import { ContentfulState } from 'src/app/shared/interfaces/contentful';
import { ContentfulActions } from '../actions';

const initialState: ContentfulState = {
  pages: [{ id: { entryID: '', contentID: '' } }],
};

export const ContentfulReducer = createReducer<ContentfulState>(
  initialState,
  on(
    ContentfulActions.getContentfulContent,
    (state, action): ContentfulState => {
      return {
        ...state,
        pages: [
          ...(state.pages || []).filter(
            page => page.id.entryID !== action.entryID && page.id.entryID !== ''
          ),
          ...(state.pages || []).map(page => {
            return page.id.entryID === action.entryID
              ? page
              : {
                  id: {
                    entryID: action.entryID,
                    contentID: action.contentID,
                  },
                };
          }),
        ],
      };
    }
  ),

  on(
    ContentfulActions.getContentfulContentSuccess,
    (state, action): ContentfulState => {
      return {
        ...state,
        pages: [
          ...(state.pages || []).map(page => {
            return page.id.entryID === action.entryID
              ? {
                  ...page,
                  content: action.content,
                }
              : page;
          }),
        ],
      };
    }
  ),

  on(ContentfulActions.getContentfulAsset, (state, action): ContentfulState => {
    return {
      ...state,
      pages: [
        ...(state.pages || []).filter(
          page => page.id.entryID !== action.entryID && page.id.entryID !== ''
        ),
        ...(state.pages || []).map(page => {
          return page.id.entryID === action.entryID
            ? { ...page, asset: { id: action.assetID, url: '' } }
            : {
                id: {
                  entryID: action.entryID,
                },
              };
        }),
      ],
    };
  }),

  on(
    ContentfulActions.getContentfulAssetSuccess,
    (state, action): ContentfulState => {
      return {
        ...state,
        pages: [
          ...(state.pages || []).map(page => {
            return page.id.entryID === action.entryID
              ? {
                  ...page,
                  asset: {
                    id: page.asset ? page.asset.id : '' || '',
                    url: action.assetUrl,
                  },
                }
              : page;
          }),
        ],
      };
    }
  )
);
