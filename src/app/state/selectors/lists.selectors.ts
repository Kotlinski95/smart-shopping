import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListsState } from 'src/app/shared/interfaces/list';
import * as AppState from 'src/app/state/app.state';

export interface State extends AppState.State {
  quickView: ListsState;
}

// Selector functions
const getTaskListsState = createFeatureSelector<ListsState>('Shopping Lists');

export const getListState = createSelector(
  getTaskListsState,
  state => state.list
);

export const getError = createSelector(getTaskListsState, state => state.error);
