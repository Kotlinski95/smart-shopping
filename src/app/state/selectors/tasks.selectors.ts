import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from 'src/app/shared/interfaces/task';

const getTasksStateSelector = createFeatureSelector<TasksState>('Tasks');

export const getTasksState = createSelector(
  getTasksStateSelector,
  state => state.tasks
);

export const getTasksError = createSelector(
  getTasksStateSelector,
  state => state.error
);
