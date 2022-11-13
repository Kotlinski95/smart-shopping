export interface List {
  _id?: { $oid: string };
  name: string;
  selected?: boolean;
}
export interface ListsState {
  lists: Array<List>;
  list: List;
  error: string;
}
