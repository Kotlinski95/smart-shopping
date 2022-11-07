import { createReducer, on } from '@ngrx/store';
import { ListsState } from 'src/app/shared/interfaces/list';
import * as ListsActions from '../actions/lists.actions';

const initialState: ListsState = {
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
  })
);
