import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ListsActions } from '../actions';
import { SsrSupportService } from 'src/app/shared/services/ssr-support.service';
import { ListService } from 'src/app/shared/services/list.service';

@Injectable()
export class ListsEffects {
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

  constructor(
    private actions$: Actions,
    private router: Router,
    private ssrSupportService: SsrSupportService,
    private listService: ListService
  ) {}
}
