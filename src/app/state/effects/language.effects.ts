import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { LanguageActions } from '../actions';

@Injectable()
export class LanguageEffects {
  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.setLanguage),
      map(() =>
        LanguageActions.setLanguageSuccess({
          language: {
            language: 'English',
          },
        })
      )
    )
  );
  constructor(private actions$: Actions) {}
}
