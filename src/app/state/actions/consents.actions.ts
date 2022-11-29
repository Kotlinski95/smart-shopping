import { createAction, props } from '@ngrx/store';

export const setCookies = createAction('[Language] Language change');

export const setCookiesSuccess = createAction(
  '[Language] Language change - success',
  props<{ cookies: boolean }>()
);

export const setCookiesFailure = createAction(
  '[Language] Language change - failure'
);

export const setPrivacy = createAction('[Language] Language change');

export const setPrivacySuccess = createAction(
  '[Language] Language change - success',
  props<{ privacy: boolean }>()
);

export const setPrivacyFailure = createAction(
  '[Language] Language change - failure'
);
