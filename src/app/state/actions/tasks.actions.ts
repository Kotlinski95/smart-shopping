import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/shared/interfaces/task';

export const setTasks = createAction('[Tasks] Set all tasks to show');

export const setTasksSuccess = createAction(
  '[Tasks] Set all tasks to show success',
  props<{ tasks: Task[] }>()
);

export const setTasksFailure = createAction(
  '[Tasks] Set all tasks to show failure',
  props<{ error: string }>()
);
