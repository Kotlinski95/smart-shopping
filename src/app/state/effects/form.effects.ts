import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FormService } from 'src/app/shared/services/form.service';
import { FormActions } from '../actions';

@Injectable()
export class FormEffects {
  sendContactForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.sendContactForm),
      switchMap(action =>
        from(this.formService.submitContactForm(action.form)).pipe(
          map(() => FormActions.sendContactFormSuccess({ form: action.form })),
          catchError(error => {
            return of(FormActions.sendContactFormFailure({ error: error }));
          })
        )
      )
    )
  );
  constructor(private actions$: Actions, private formService: FormService) {}
}
