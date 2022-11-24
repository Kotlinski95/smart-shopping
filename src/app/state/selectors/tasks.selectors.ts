import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListsState } from 'src/app/shared/interfaces/list';

const getTasksStateSelector =
  createFeatureSelector<ListsState>('Shopping-Lists');

export const getTasksState = createSelector(
  getTasksStateSelector,
  state => state && state.list.tasks
);

export const getTasksError = createSelector(
  getTasksStateSelector,
  state => state && state.error
);
