import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { ContactForm } from 'src/app/shared/interfaces/form';

export const sendContactForm = createAction(
  '[Form] Send contact form',
  props<{ value: ContactForm }>()
);

export const sendContactFormSuccess = createAction(
  '[Form] Send contact form - success',
  props<{ value: ContactForm }>()
);

export const sendContactFormFailure = createAction(
  '[Form] Send contact form - failure',
  props<{ error: string }>()
);
