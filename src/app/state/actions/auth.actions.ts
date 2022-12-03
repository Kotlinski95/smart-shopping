import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user';
import firebase from 'firebase/compat/app';

export const userLogin = createAction(
  '[Authorization] User login',
  props<{ login: string; password: string }>()
);

export const userLoginSuccess = createAction(
  '[Authorization] User login - success'
);

export const userLoginFailure = createAction(
  '[Authorization] User login - failure',
  props<{ error: string }>()
);

export const userSignUp = createAction(
  '[Authorization] User sign in',
  props<{ email: string; password: string }>()
);

export const userSignUpSuccess = createAction(
  '[Authorization] User sign in - success'
);

export const userSignUpFailure = createAction(
  '[Authorization] User sign in - failure',
  props<{ error: string }>()
);

export const userLogout = createAction('[Authorization] User log out');

export const userLogoutSuccess = createAction(
  '[Authorization] User log out - success'
);

export const userLogoutFailure = createAction(
  '[Authorization] User log out - failure',
  props<{ error: string }>()
);

export const setUser = createAction(
  '[Authorization] Set User',
  props<{ user: firebase.User | null }>()
);

export const setUserSuccess = createAction(
  '[Authorization] Set User - success',
  props<{ user: User }>()
);

export const setUserFailure = createAction(
  '[Authorization] Set User - failure',
  props<{ error: string }>()
);
export function userLoginError(error: any): any {
  throw new Error('Function not implemented.');
}

export const googleAuth = createAction('[Authorization] Google authentication');

export const googleAuthSuccess = createAction(
  '[Authorization] Google authentication - success'
);

export const googleAuthFailure = createAction(
  '[Authorization] Google authentication - failure',
  props<{ error: string }>()
);

export const facebookAuth = createAction(
  '[Authorization] Facebook authentication'
);

export const facebookAuthSuccess = createAction(
  '[Authorization] Facebook authentication - success'
);

export const facebookAuthFailure = createAction(
  '[Authorization] Facebook authentication - failure',
  props<{ error: string }>()
);

export const anonymousLogin = createAction('[Authorization] Anonymous login');

export const anonymousLoginSuccess = createAction(
  '[Authorization] Anonymous login - success'
);

export const anonymousLoginFailure = createAction(
  '[Authorization] Anonymous login failure',
  props<{ error: string }>()
);

export const forgotPassword = createAction(
  '[Authorization] User forgot password',
  props<{ passwordResetEmail: string }>()
);

export const forgotPasswordSuccess = createAction(
  '[Authorization] User forgot password - success'
);

export const forgotPasswordFailure = createAction(
  '[Authorization] User forgot password - failure',
  props<{ error: string }>()
);

export const sendVerificationMail = createAction(
  '[Authorization] Send verification mail'
);

export const sendVerificationMailSuccess = createAction(
  '[Authorization] Send verification mail - success'
);

export const sendVerificationMailFailure = createAction(
  '[Authorization] Send verification mail - failure',
  props<{ error: string }>()
);
