import { createAction, props } from '@ngrx/store';

export const setCookies = createAction('[Consents] Cookies change');

export const setCookiesSuccess = createAction(
  '[Language] Cookies change - success',
  props<{ cookies: boolean }>()
);

export const setCookiesFailure = createAction(
  '[Language] Cookies change - failure'
);

export const setPrivacy = createAction('[Consents] Privacy and Policy change');

export const setPrivacySuccess = createAction(
  '[Language] Privacy and Policy change - success',
  props<{ privacy: boolean }>()
);

export const setPrivacyFailure = createAction(
  '[Language] Privacy and Policy change - failure'
);
