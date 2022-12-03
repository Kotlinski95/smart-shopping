import { createReducer, on } from '@ngrx/store';
import { ConsentsState } from 'src/app/shared/interfaces/consents';
import { ConsentsActions } from '../actions';

const initialState: ConsentsState = {
  consents: {
    termly: {
      cookies: {},
      termlyResourceBlockerLoaded: false,
      unblockingCookies: {},
      cookiesCategories: {
        advertising: false,
        analytics: false,
        essential: false,
        performance: false,
        social_networking: false,
        unclassified: false,
      },
    },
    privacy: false,
  },
  error: '',
};

export const ConsentsReducer = createReducer<ConsentsState>(
  initialState,
  on(ConsentsActions.setTermlyState, (state): ConsentsState => {
    return {
      ...state,
    };
  }),

  on(ConsentsActions.setTermlyStateSuccess, (state, action): ConsentsState => {
    return {
      ...state,
      consents: { ...state.consents, termly: action.termly },
    };
  }),

  on(ConsentsActions.setTermlyStateFailure, (state): ConsentsState => {
    return {
      ...state,
    };
  }),

  on(ConsentsActions.setCookies, (state): ConsentsState => {
    return {
      ...state,
    };
  }),

  on(ConsentsActions.setCookiesSuccess, (state, action): ConsentsState => {
    return {
      ...state,
      consents: {
        ...state.consents,
        termly: { ...state.consents.termly, cookies: action.cookies },
      },
    };
  }),

  on(ConsentsActions.setCookiesFailure, (state): ConsentsState => {
    return {
      ...state,
    };
  }),

  on(ConsentsActions.setPrivacy, (state): ConsentsState => {
    return {
      ...state,
    };
  }),

  on(ConsentsActions.setPrivacySuccess, (state, action): ConsentsState => {
    return {
      ...state,
      consents: { ...state.consents, privacy: action.privacy },
    };
  }),

  on(ConsentsActions.setPrivacyFailure, (state): ConsentsState => {
    return {
      ...state,
    };
  })
);
