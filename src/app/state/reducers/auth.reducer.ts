import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/shared/interfaces/user';
import { AuthActions } from '../actions';

const initialState: AuthState = {
  loggedIn: false,
  user: undefined,
  error: '',
  pending: false,
};

export const AuthReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.userLogin, (state): AuthState => {
    return {
      ...state,
      pending: true,
    };
  }),

  on(AuthActions.userLoginSuccess, (state): AuthState => {
    return {
      ...state,
      pending: false,
    };
  }),

  on(AuthActions.userLoginFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  }),

  on(AuthActions.userSignUp, (state): AuthState => {
    return {
      ...state,
      pending: true,
    };
  }),

  on(AuthActions.userSignUpSuccess, (state): AuthState => {
    return {
      ...state,
      pending: false,
    };
  }),

  on(AuthActions.userSignUpFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  }),

  on(AuthActions.userLogout, (state): AuthState => {
    return {
      ...state,
      pending: true,
    };
  }),

  on(AuthActions.userLogoutSuccess, (state): AuthState => {
    return {
      ...state,
      loggedIn: false,
      user: undefined,
      pending: false,
    };
  }),

  on(AuthActions.userLogoutFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  }),

  on(AuthActions.setUser, (state): AuthState => {
    return {
      ...state,
    };
  }),

  on(AuthActions.setUserSuccess, (state, action): AuthState => {
    return {
      ...state,
      loggedIn: action.user.uid ? true : false,
      user: action.user,
    };
  }),

  on(AuthActions.setUserFailure, (state, action): AuthState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(AuthActions.googleAuth, (state): AuthState => {
    return {
      ...state,
      pending: true,
    };
  }),

  on(AuthActions.googleAuthSuccess, (state): AuthState => {
    return {
      ...state,
      pending: false,
    };
  }),

  on(AuthActions.googleAuthFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  }),

  on(AuthActions.facebookAuth, (state): AuthState => {
    return {
      ...state,
      pending: true,
    };
  }),

  on(AuthActions.facebookAuthSuccess, (state): AuthState => {
    return {
      ...state,
      pending: false,
    };
  }),

  on(AuthActions.facebookAuthFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  }),

  on(AuthActions.anonymousLogin, (state): AuthState => {
    return {
      ...state,
      pending: true,
    };
  }),

  on(AuthActions.anonymousLoginSuccess, (state): AuthState => {
    return {
      ...state,
      pending: false,
    };
  }),

  on(AuthActions.anonymousLoginFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  }),

  on(AuthActions.forgotPassword, (state): AuthState => {
    return {
      ...state,
      pending: true,
      error: '',
    };
  }),

  on(AuthActions.forgotPasswordSuccess, (state): AuthState => {
    return {
      ...state,
      pending: false,
    };
  }),

  on(AuthActions.forgotPasswordFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  }),

  on(AuthActions.sendVerificationMail, (state): AuthState => {
    return {
      ...state,
      pending: true,
      error: '',
    };
  }),

  on(AuthActions.sendVerificationMailSuccess, (state): AuthState => {
    return {
      ...state,
      pending: false,
    };
  }),

  on(AuthActions.sendVerificationMailFailure, (state, action): AuthState => {
    return {
      ...state,
      pending: false,
      error: action.error,
    };
  })
);
