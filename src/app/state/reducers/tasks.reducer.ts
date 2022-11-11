import { createReducer, on } from '@ngrx/store';
import { TasksState } from 'src/app/shared/interfaces/task';
import { TasksActions } from '../actions';

const initialState: TasksState = {
  tasks: [],
  error: '',
};

export const TasksReducer = createReducer<TasksState>(
  initialState,
  on(TasksActions.setTasksSuccess, (state, action): TasksState => {
    return {
      ...state,
      tasks: action.tasks,
    };
  }),
  on(TasksActions.setTasks, (state): TasksState => {
    return {
      ...state,
    };
  })
);
