export interface List {
  _id?: { $oid: string };
  name: string;
}
export interface ListsState {
  lists: Array<List>;
  list: List;
  error: string;
}
