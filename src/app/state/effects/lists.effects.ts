import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ListsActions } from '../actions';

@Injectable()
export class ListsEffects {
  setTasksList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsActions.setList),
      map(() => ListsActions.setListSuccess())
    )
  );
  constructor(private store: Store, private actions$: Actions) {}
}
