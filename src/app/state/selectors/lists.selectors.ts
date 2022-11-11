import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListsState } from 'src/app/shared/interfaces/list';

const getTaskListsState = createFeatureSelector<ListsState>('Shopping-Lists');

export const getListState = createSelector(
  getTaskListsState,
  state => state && state.list
);

export const getListError = createSelector(
  getTaskListsState,
  state => state && state.error
);
