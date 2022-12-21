import { createReducer, on } from '@ngrx/store';
import { ContentfulState } from 'src/app/shared/interfaces/contentful';
import { ContentfulActions } from '../actions';

const initialState: ContentfulState = {
  pages: [{ id: { entryID: '', contentID: '' }, loaded: false }],
};

export const ContentfulReducer = createReducer<ContentfulState>(
  initialState,
  on(
    ContentfulActions.getContentfulContent,
    (state, action): ContentfulState => {
      const existingPage = state.pages.find(
        page => page.id.entryID === action.entryID && page.id.entryID !== ''
      );
      return {
        ...state,
        pages: [
          ...(state.pages || []).filter(
            page => page.id.entryID !== action.entryID && page.id.entryID !== ''
          ),
          existingPage
            ? existingPage
            : {
                id: {
                  entryID: action.entryID,
                  contentID: action.contentID,
                },
                loaded: false,
              },
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
                  loaded: true,
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
        ...(state.pages || []).map(page => {
          return page.id.entryID === action.entryID
            ? {
                ...page,
                asset: {
                  id: action.assetID,
                  url: page.asset && page.asset.url ? page.asset.url : '',
                },
              }
            : page;
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
