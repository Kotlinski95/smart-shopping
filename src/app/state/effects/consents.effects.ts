import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { ConsentsActions } from '../actions';

@Injectable()
export class ConsentsEffects {
  setCookies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentsActions.setCookies),
      map(() =>
        ConsentsActions.setCookiesSuccess({
          cookies: true,
        })
      )
    )
  );
  setPrivacy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentsActions.setPrivacy),
      map(() =>
        ConsentsActions.setPrivacySuccess({
          privacy: true,
        })
      )
    )
  );
  constructor(private actions$: Actions) {}
}
