import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap, take } from 'rxjs/operators';
import { FormService } from 'src/app/shared/services/form.service';
import { FormActions } from '../actions';

@Injectable()
export class FormEffects {
  sendContactForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.sendContactForm),
      switchMap(action =>
        from(
          Promise.all([
            this.formService.submitContactForm(action.value),
            this.formService.sendEmailTemplate(event),
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
  constructor(private actions$: Actions, private formService: FormService) {}
}
