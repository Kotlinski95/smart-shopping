import { createReducer, on } from '@ngrx/store';
import { FormState } from 'src/app/shared/interfaces/form';
import { FormActions } from '../actions';

const initialState: FormState = {
  contactForm: {
    form: {
      name: '',
      email: '',
      message: '',
      topic: '',
    },
    error: '',
  },
};

export const FormReducer = createReducer<FormState>(
  initialState,
  on(FormActions.sendContactForm, (state): FormState => {
    return {
      ...state,
    };
  }),
  on(FormActions.sendContactFormSuccess, (state, action): FormState => {
    return {
      ...state,
      contactForm: { form: action.form, error: '' },
    };
  }),
  on(FormActions.sendContactFormFailure, (state, action): FormState => {
    return {
      ...state,
      contactForm: { form: initialState.contactForm.form, error: action.error },
    };
  })
);
