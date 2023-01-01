import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FormService } from 'src/app/shared/services/form.service';
import { FormActions } from '../actions';
import { getLanguage } from '../selectors/language.selectors';

@Injectable()
export class FormEffects {
  sendContactForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.sendContactForm),
      withLatestFrom(this.store.select(getLanguage)),
      switchMap(([action, language]) =>
        from(
          Promise.all([
            this.formService.submitContactForm(action.value),
            this.formService.sendEmailTemplate(event, language),
          ])
        ).pipe(
          map(() => {
            this.formService.sendFormSuccessfully();
            return FormActions.sendContactFormSuccess({ value: action.value });
          }),
          catchError(error => {
            this.formService.sendFormFailure(error.text);
            return of(
              FormActions.sendContactFormFailure({ error: error.text })
            );
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private formService: FormService,
    private store: Store
  ) {}
}
