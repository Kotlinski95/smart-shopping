import { createReducer, on } from '@ngrx/store';
import { ListsState } from 'src/app/shared/interfaces/list';
import * as ListsActions from '../actions/lists.actions';

const initialState: ListsState = {
  lists: [],
  list: { name: '' },
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
  })
);
