import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ListsActions } from '../actions';

@Injectable()
export class TasksListEffects {
  setTasksList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsActions.setList),
      map(() => {
        return ListsActions.setListSuccess();
      }),
      catchError((error: string) => {
        return of(ListsActions.setListFailure({ error }));
      })
    )
  );

  constructor(private actions$: Actions) {}
}
