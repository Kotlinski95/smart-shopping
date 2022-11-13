import { setList } from './../actions/lists.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { List } from 'src/app/shared/interfaces/list';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ListsActions } from '../actions';
import { SsrSupportService } from 'src/app/shared/services/ssr-support.service';
import { ListService } from 'src/app/shared/services/list.service';
import { of } from 'rxjs';
import { getListsState } from '../selectors';

@Injectable()
export class ListsEffects {
  setLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsActions.setLists),
      withLatestFrom(this.store.select(getListsState)),
      switchMap(([action, lists]) => {
        return this.listService.getListObservableFb().pipe(
          take(1),
          map((lists: List[]) => {
            return ListsActions.setListsSuccess({ lists: lists });
          }),
          catchError((error: string) => {
            return of(ListsActions.setListsFailure({ error }));
          })
        );
      })
    )
  );

  setTasksList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsActions.setList),
      tap(action => {
        this.ssrSupportService.setLocalStorageItem(
          'list',
          JSON.stringify(action.list)
        );
      }),
      map(() => ListsActions.setListSuccess()),
      tap(() => {
        this.router.navigate(['/']);
      })
    )
  );

  createTasksList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsActions.createList),
      tap(list => this.listService.createList(list.list)),
      map(() => ListsActions.createListSuccess())
    )
  );

  removeTasksList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsActions.removeList),
      tap(list => this.listService.removeList(list.list)),
      map(() => ListsActions.removeListSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private ssrSupportService: SsrSupportService,
    private listService: ListService,
    private store: Store
  ) {}
}
