import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/shared/interfaces/user';
import { AuthActions } from '../actions';

const initialState: AuthState = {
  loggedIn: false,
  user: undefined,
  error: '',
};

export const AuthReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.userLogin, (state): AuthState => {
    return {
      ...state,
    };
  }),

  on(AuthActions.userLoginSuccess, (state, action): AuthState => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(AuthActions.userLoginFailure, (state): AuthState => {
    return {
      ...state,
    };
  })
);
