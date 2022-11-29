import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConsentsState } from 'src/app/shared/interfaces/consents';

const getConsentsState = createFeatureSelector<ConsentsState>('Consents');

export const getCookiesState = createSelector(
  getConsentsState,
  state => state && state.consents.cookies
);

export const getPrivacyState = createSelector(
  getConsentsState,
  state => state && state.consents.privacy
);
