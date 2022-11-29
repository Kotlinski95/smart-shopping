import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguageState } from 'src/app/shared/interfaces/language';

const getLanguageState = createFeatureSelector<LanguageState>('Language');

export const getLanguage = createSelector(
  getLanguageState,
  state => state && state.language
);
