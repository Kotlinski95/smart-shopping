import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {
  setUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userLogin),
      map(() =>
        AuthActions.userLoginSuccess({
          user: {
            uid: '',
            email: '',
            displayName: '',
            photoURL: '',
            emailVerified: false,
          },
        })
      )
    )
  );
  constructor(private actions$: Actions) {}
}
