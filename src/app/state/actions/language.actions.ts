import { createAction, props } from '@ngrx/store';
import { Language } from 'src/app/shared/interfaces/language';

export const setLanguage = createAction(
  '[Language] Language change',
  props<{ language: string }>()
);

export const setLanguageSuccess = createAction(
  '[Language] Language change - success',
  props<{ language: Language }>()
);

export const setLanguageFailure = createAction(
  '[Language] Language change - failure'
);

export const useLanguage = createAction(
  '[Language] Use language',
  props<{ language: string }>()
);

export const useLanguageSuccess = createAction(
  '[Language] Use language - success',
  props<{ language: Language }>()
);

export const useLanguageFailure = createAction(
  '[Language] Use language - failure'
);
