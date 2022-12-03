import { createAction, props } from '@ngrx/store';
import { Termly } from 'src/app/shared/interfaces/consents';

export const setTermlyState = createAction('[Consents] Set Termly state');

export const setTermlyStateSuccess = createAction(
  '[Consents] Set Termly state - success',
  props<{ termly: Termly }>()
);

export const setTermlyStateFailure = createAction(
  '[Consents] Set Termly state - failure'
);

export const setCookies = createAction('[Consents] Cookies change');

export const setCookiesSuccess = createAction(
  '[Consents] Cookies change - success',
  props<{ cookies: boolean }>()
);

export const setCookiesFailure = createAction(
  '[Consents] Cookies change - failure'
);

export const setPrivacy = createAction('[Consents] Privacy and Policy change');

export const setPrivacySuccess = createAction(
  '[Consents] Privacy and Policy change - success',
  props<{ privacy: boolean }>()
);

export const setPrivacyFailure = createAction(
  '[Consents] Privacy and Policy change - failure'
);
