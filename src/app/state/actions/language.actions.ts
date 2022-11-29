import { createAction, props } from '@ngrx/store';
import { Language } from 'src/app/shared/interfaces/language';

export const setLanguage = createAction('[Language] Language change');

export const setLanguageSuccess = createAction(
  '[Language] Language change - success',
  props<{ language: Language }>()
);

export const setLanguageFailure = createAction(
  '[Language] Language change - failure'
);
