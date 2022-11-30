import { createReducer, on } from '@ngrx/store';
import { LanguageState } from 'src/app/shared/interfaces/language';
import { LanguageActions } from '../actions';

const initialState: LanguageState = {
  language: { language: 'english' },
  error: '',
};

export const LanguageReducer = createReducer<LanguageState>(
  initialState,
  on(LanguageActions.setLanguage, (state): LanguageState => {
    return {
      ...state,
    };
  }),

  on(LanguageActions.setLanguageSuccess, (state, action): LanguageState => {
    return {
      ...state,
      language: action.language,
    };
  }),

  on(LanguageActions.setLanguageFailure, (state): LanguageState => {
    return {
      ...state,
    };
  }),

  on(LanguageActions.useLanguage, (state): LanguageState => {
    return {
      ...state,
    };
  }),

  on(LanguageActions.useLanguageSuccess, (state, action): LanguageState => {
    return {
      ...state,
      language: action.language,
    };
  }),

  on(LanguageActions.useLanguageFailure, (state): LanguageState => {
    return {
      ...state,
    };
  })
);
