import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/shared/interfaces/task';

export const setTasks = createAction('[Tasks] Set all tasks to show');

export const setTasksSuccess = createAction(
  '[Tasks] Set all tasks to show - success',
  props<{ tasks: Task[] }>()
);

export const setTasksFailure = createAction(
  '[Tasks] Set all tasks to show - failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Tasks] Add task to list',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Tasks] Add task to list - success'
);

export const addTaskFailure = createAction(
  '[Tasks] Add task to list - failure',
  props<{ error: string }>()
);

export const removeTask = createAction(
  '[Tasks] Remove task from the list',
  props<{ task: Task }>()
);

export const removeTaskSuccess = createAction(
  '[Tasks] Remove task from the list - success'
);

export const removeTaskFailure = createAction(
  '[Tasks] Remove task from the list - failure',
  props<{ error: string }>()
);

export const doneTask = createAction(
  '[Tasks] Set task as done',
  props<{ task: Task }>()
);

export const doneTaskSuccess = createAction(
  '[Tasks] Set task as done - success'
);

export const doneTaskFailure = createAction(
  '[Tasks] Set task as done - failure',
  props<{ error: string }>()
);

export const undoTask = createAction(
  '[Tasks] Task restored to shopping list',
  props<{ task: Task }>()
);

export const undoTaskSuccess = createAction(
  '[Tasks] Task restored to shopping list - success'
);

export const undoTaskFailure = createAction(
  '[Tasks] Task restored to shopping list - failure',
  props<{ error: string }>()
);

export const addAllTasks = createAction(
  '[Tasks] Add all tasks to list',
  props<{ list: Array<Task> }>()
);

export const addAllTasksSuccess = createAction(
  '[Tasks] Add all tasks to list - success'
);

export const addAllTasksFailure = createAction(
  '[Tasks] Add all tasks to list - failure',
  props<{ error: string }>()
);

export const removeAllTasks = createAction(
  '[Tasks] Remove all tasks from the list',
  props<{ list: Array<Task> }>()
);

export const removeAllTasksSuccess = createAction(
  '[Tasks] Remove all tasks from the list - success'
);

export const removeAllTasksFailure = createAction(
  '[Tasks] Remove all tasks from the list - failure',
  props<{ error: string }>()
);
