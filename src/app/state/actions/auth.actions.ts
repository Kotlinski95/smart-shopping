import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user';

export const userLogin = createAction('[Authorization] User login');

export const userLoginSuccess = createAction(
  '[Authorization] User login - success',
  props<{ user: User }>()
);

export const userLoginFailure = createAction(
  '[Authorization] User login - failure'
);
