import { Task } from '../interfaces/task';

export interface List {
  _id?: { $oid: string };
  name: string;
  selected?: boolean;
  tasks?: Task[];
}
export interface ListsState {
  lists: Array<List>;
  list: List;
  error: string;
}
