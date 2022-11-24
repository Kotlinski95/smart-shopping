import { createReducer, on } from '@ngrx/store';
import { ListsState } from 'src/app/shared/interfaces/list';
import { TasksActions } from '../actions';
import * as ListsActions from '../actions/lists.actions';

const initialState: ListsState = {
  lists: [],
  list: { name: '', tasks: [] },
  error: '',
};

export const ListsReducer = createReducer<ListsState>(
  initialState,
  on(ListsActions.setListSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(ListsActions.setList, (state, action): ListsState => {
    return {
      ...state,
      list: action.list,
    };
  }),
  on(ListsActions.setListsSuccess, (state, action): ListsState => {
    return {
      ...state,
      lists: action.lists,
    };
  }),
  on(ListsActions.setLists, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(ListsActions.createListSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(ListsActions.createList, (state, action): ListsState => {
    return {
      ...state,
      lists: [...state.lists, action.list],
    };
  }),
  on(ListsActions.removeListSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(ListsActions.removeList, (state, action): ListsState => {
    return {
      ...state,
      lists: [...state.lists.filter(list => list !== action.list)],
    };
  }),
  on(TasksActions.setTasksSuccess, (state, action): ListsState => {
    if (state.list) {
      return {
        ...state,
        list: { ...state.list, tasks: action.tasks },
      };
    }
    return {
      ...state,
    };
  }),
  on(TasksActions.setTasks, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.addTask, (state, action): ListsState => {
    if (state.list) {
      return {
        ...state,
        lists: [
          ...state.lists.map(list => {
            if (list.tasks && list.name === state.list.name) {
              return {
                ...state.list,
                tasks: [...list.tasks, action.task],
              };
            }
            return list;
          }),
        ],
        list: {
          ...state.list,
          tasks: [...(state.list.tasks || []), action.task],
        },
      };
    }
    return { ...state };
  }),
  on(TasksActions.addTaskSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.removeTask, (state, action): ListsState => {
    if (state.list) {
      return {
        ...state,
        lists: [
          ...state.lists.map(list => {
            if (list.tasks && list.name === state.list.name) {
              return {
                ...state.list,
                tasks: [
                  ...(state.list.tasks?.filter(task => task !== action.task) ||
                    []),
                ],
              };
            }
            return list;
          }),
        ],
        list: {
          ...state.list,
          tasks: [
            ...(state.list.tasks || []).filter(task => task !== action.task),
          ],
        },
      };
    }
    return { ...state };
  }),
  on(TasksActions.removeTaskSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.doneTask, (state, action): ListsState => {
    if (state.list) {
      return {
        ...state,
        lists: [
          ...state.lists.map(list => {
            if (list.tasks && list.name === state.list.name) {
              return {
                ...state.list,
                tasks: [
                  ...(state.list.tasks?.map(task => {
                    return task.name === action.task.name
                      ? { ...action.task, isDone: true }
                      : task;
                  }) || []),
                ],
              };
            }
            return list;
          }),
        ],
        list: {
          ...state.list,
          tasks: [
            ...(state.list.tasks || []).map(task => {
              return task.name === action.task.name
                ? { ...action.task, isDone: true }
                : task;
            }),
          ],
        },
      };
    }
    return { ...state };
  }),
  on(TasksActions.doneTaskSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.undoTask, (state, action): ListsState => {
    if (state.list) {
      return {
        ...state,
        lists: [
          ...state.lists.map(list => {
            if (list.tasks && list.name === state.list.name) {
              return {
                ...state.list,
                tasks: [
                  ...(state.list.tasks?.map(task => {
                    return task.name === action.task.name
                      ? { ...action.task, isDone: false }
                      : task;
                  }) || []),
                ],
              };
            }
            return list;
          }),
        ],
        list: {
          ...state.list,
          tasks: [
            ...(state.list.tasks || []).map(task => {
              return task.name === action.task.name
                ? { ...action.task, isDone: false }
                : task;
            }),
          ],
        },
      };
    }
    return { ...state };
  }),
  on(TasksActions.undoTaskSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.addAllTasks, (state, action): ListsState => {
    if (state.list) {
      return {
        ...state,
        lists: [
          ...state.lists.map(list => {
            if (list.tasks && list.name === state.list.name) {
              return {
                ...state.list,
                tasks: [
                  ...(state.list.tasks?.map(task => {
                    return action.list.includes(task)
                      ? { ...task, isDone: true }
                      : task;
                  }) || []),
                ],
              };
            }
            return list;
          }),
        ],
        list: {
          ...state.list,
          tasks: [
            ...(state.list.tasks || []).map(task => {
              return action.list.includes(task)
                ? { ...task, isDone: true }
                : task;
            }),
          ],
        },
      };
    }
    return { ...state };
  }),
  on(TasksActions.addAllTasksSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),
  on(TasksActions.removeAllTasks, (state, action): ListsState => {
    if (state.list) {
      return {
        ...state,
        lists: [
          ...state.lists.map(list => {
            if (list.tasks && list.name === state.list.name) {
              return {
                ...state.list,
                tasks: [
                  ...(state.list.tasks?.filter(task => {
                    return !action.list.includes(task);
                  }) || []),
                ],
              };
            }
            return list;
          }),
        ],
        list: {
          ...state.list,
          tasks: [
            ...(state.list.tasks || []).filter(task => {
              return !action.list.includes(task);
            }),
          ],
        },
      };
    }
    return { ...state };
  }),
  on(TasksActions.removeAllTasksSuccess, (state): ListsState => {
    return {
      ...state,
    };
  }),

  on(ListsActions.cleanSelectedList, (state): ListsState => {
    return {
      ...state,
    };
  }),

  on(ListsActions.cleanSelectedListSuccess, (state): ListsState => {
    if (state.list) {
      return {
        ...state,
        list: initialState.list,
      };
    }
    return {
      ...state,
    };
  })
);
