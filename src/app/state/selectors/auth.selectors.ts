import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/shared/interfaces/user';

const getAuthState = createFeatureSelector<AuthState>('Authorization');

export const getUserState = createSelector(
  getAuthState,
  state => state && state.user
);

export const getLoginState = createSelector(
  getAuthState,
  state => state && state.loggedIn
);
