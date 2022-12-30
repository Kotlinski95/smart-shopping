export interface ContactForm {
  name: string;
  email: string;
  message: string;
  topic: string;
}

export interface ContactFormState {
  form: ContactForm;
  error: string;
}

export interface FormState {
  contactForm: ContactFormState;
}
