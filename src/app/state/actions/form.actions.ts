import { createAction, props } from '@ngrx/store';
import { ContactForm } from 'src/app/shared/interfaces/form';

export const sendContactForm = createAction(
  '[Form] Send contact form',
  props<{ form: ContactForm }>()
);

export const sendContactFormSuccess = createAction(
  '[Form] Send contact form - success',
  props<{ form: ContactForm }>()
);

export const sendContactFormFailure = createAction(
  '[Form] Send contact form - failure',
  props<{ error: string }>()
);
