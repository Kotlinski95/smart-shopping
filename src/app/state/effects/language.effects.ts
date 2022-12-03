import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LanguageActions } from '../actions';

@Injectable()
export class LanguageEffects {
  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.setLanguage),
      tap(action => this.languageService.changeLanguage(action.language)),
      map(action =>
        LanguageActions.setLanguageSuccess({
          language: {
            language: action.language,
          },
        })
      )
    )
  );
  useLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.useLanguage),
      tap(action => this.languageService.useLanguage(action.language)),
      map(action =>
        LanguageActions.useLanguageSuccess({
          language: {
            language: action.language,
          },
        })
      )
    )
  );
  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) {}
}
