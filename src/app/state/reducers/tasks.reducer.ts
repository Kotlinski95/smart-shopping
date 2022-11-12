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
  }),
  on(TasksActions.addTask, (state, action): TasksState => {
    return {
      ...state,
      tasks: [...state.tasks, action.task],
    };
  }),
  on(TasksActions.addTaskSuccess, (state): TasksState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.removeTask, (state, action): TasksState => {
    return {
      ...state,
      tasks: [...state.tasks.filter(task => task !== action.task)],
    };
  }),
  on(TasksActions.removeTaskSuccess, (state): TasksState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.doneTask, (state, action): TasksState => {
    return {
      ...state,
      tasks: [
        ...state.tasks.map(task => {
          return task.name === action.task.name
            ? { ...action.task, isDone: true }
            : task;
        }),
      ],
    };
  }),
  on(TasksActions.doneTaskSuccess, (state): TasksState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.undoTask, (state, action): TasksState => {
    return {
      ...state,
      tasks: [
        ...state.tasks.map(task => {
          return task.name === action.task.name
            ? { ...action.task, isDone: false }
            : task;
        }),
      ],
    };
  }),
  on(TasksActions.undoTaskSuccess, (state): TasksState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.addAllTasks, (state, action): TasksState => {
    return {
      ...state,
      tasks: [
        ...state.tasks.map(task => {
          return action.list.includes(task) ? { ...task, isDone: true } : task;
        }),
      ],
    };
  }),
  on(TasksActions.addAllTasksSuccess, (state): TasksState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.removeAllTasks, (state, action): TasksState => {
    return {
      ...state,
      tasks: [
        ...state.tasks.filter(task => {
          return !action.list.includes(task);
        }),
      ],
    };
  }),
  on(TasksActions.removeAllTasksSuccess, (state): TasksState => {
    return {
      ...state,
    };
  })
);
