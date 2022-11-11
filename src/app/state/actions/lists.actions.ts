import { createAction, props } from '@ngrx/store';
import { List } from 'src/app/shared/interfaces/list';

export const setList = createAction(
  '[Task-Lists] Set task list to show',
  props<{ list: List }>()
);

export const setListSuccess = createAction(
  '[Task-Lists] Set task list to show success'
);

export const setListFailure = createAction(
  '[Task-Lists] Create Subscription failure',
  props<{ error: string }>()
);
