export interface List {
  _id?: { $oid: string };
  name: string;
}
export interface ListsState {
  list: List;
  error: string;
}
