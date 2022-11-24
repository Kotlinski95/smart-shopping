import { createAction, props } from '@ngrx/store';
import { List } from 'src/app/shared/interfaces/list';

export const setList = createAction(
  '[Task-Lists] Set task list to show',
  props<{ list: List }>()
);

export const setListSuccess = createAction(
  '[Task-Lists] Set task list to show - success'
);

export const setListFailure = createAction(
  '[Task-Lists] Set task list to show - failure',
  props<{ error: string }>()
);

export const setLists = createAction('[Task-Lists] Set lists to show');

export const setListsSuccess = createAction(
  '[Task-Lists] Set lists to show - success',
  props<{ lists: List[] }>()
);

export const setListsFailure = createAction(
  '[Task-Lists] Set lists to show - failure',
  props<{ error: string }>()
);

export const createList = createAction(
  '[Task-Lists] Create new task list',
  props<{ list: List }>()
);

export const createListSuccess = createAction(
  '[Task-Lists] Create new task list - success'
);

export const createListFailure = createAction(
  '[Task-Lists] Create new task list - failure',
  props<{ error: string }>()
);

export const removeList = createAction(
  '[Task-Lists] Remove task from the list',
  props<{ list: List }>()
);

export const removeListSuccess = createAction(
  '[Task-Lists] Remove task from the list - success'
);

export const removeListFailure = createAction(
  '[Task-Lists] Remove task from the list - failure',
  props<{ error: string }>()
);

export const cleanSelectedList = createAction(
  '[Task-Lists] Clean selected list'
);

export const cleanSelectedListSuccess = createAction(
  '[Task-Lists] Clean selected list - succes'
);

export const cleanSelectedListtFailure = createAction(
  '[Task-Lists] Clean selected list - failure',
  props<{ error: string }>()
);
