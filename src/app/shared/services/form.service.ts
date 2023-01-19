import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertType } from '../interfaces/alert';
import { ContactForm } from '../interfaces/form';
import { AlertService } from './alert.service';
import emailjs from '@emailjs/browser';
import { Language } from '../interfaces/language';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private contactFormCollection: AngularFirestoreCollection<any> | undefined;
  private nameRegExp = /^[\s\p{L}]+$/u;
  private translationSection = 'alert.form';
  private initialContactFormValue = {
    name: null,
    email: '',
    message: '',
    topic: '',
    topicValue: '',
    consent: '',
  };
  private initialSignInFormValue = {
    login: '',
    password: '',
  };

  private initialSignUpFormValue = {
    email: '',
    password: '',
    passwordConfirm: '',
  };

  private initialPasswordRecoverFormValue = {
    email: '',
  };

  private contactForm = new FormGroup({
    name: new FormControl(this.initialContactFormValue.name, [
      Validators.pattern(this.nameRegExp),
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(this.initialContactFormValue.email, [
      Validators.required,
      Validators.email,
    ]),
    message: new FormControl(
      this.initialContactFormValue.message,
      Validators.required
    ),
    topic: new FormControl(
      this.initialContactFormValue.topic,
      Validators.required
    ),
    topicValue: new FormControl(this.initialContactFormValue.topicValue),
    consent: new FormControl(
      this.initialContactFormValue.consent,
      Validators.required
    ),
  });

  private signInForm = new FormGroup({
    login: new FormControl(this.initialSignInFormValue.login, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(this.initialSignInFormValue.password, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  private signUpForm = new FormGroup(
    {
      email: new FormControl(this.initialSignUpFormValue.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.initialSignUpFormValue.password, [
        Validators.required,
        Validators.minLength(3),
      ]),
      passwordConfirm: new FormControl(
        this.initialSignUpFormValue.passwordConfirm,
        [Validators.required, Validators.minLength(3)]
      ),
    },
    { validators: this.checkPasswords }
  );

  private passwordRecoverForm = new FormGroup({
    email: new FormControl(this.initialPasswordRecoverFormValue.email, [
      Validators.required,
      Validators.email,
    ]),
  });

  private contactFormSubject = new BehaviorSubject(this.contactForm);
  public contactFormSubject$ = this.contactFormSubject.asObservable();
  constructor(
    private firestore: AngularFirestore,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.contactFormCollection = this.firestore.collection('messages');
  }

  public getContantForm(): FormGroup {
    return this.contactForm;
  }

  public getSignForm(): FormGroup {
    return this.signInForm;
  }

  public getSignUpForm(): FormGroup {
    return this.signUpForm;
  }

  public getPasswordRecoverForm(): FormGroup {
    return this.passwordRecoverForm;
  }

  public submitContactForm(form: ContactForm): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
      return this.contactFormCollection
        ?.add(form)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public sendEmailTemplate(
    event: Event | undefined,
    language: Language
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
      return emailjs
        .sendForm(
          'service_0lcu3bp',
          language.language === 'pl' ? 'template_u9qdz6m' : 'template_insnjq5',
          event?.target as HTMLFormElement,
          '0jafi06jMGqoFKzR7'
        )
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public sendFormSuccessfully() {
    this.alertService.setAlert({
      type: AlertType.Success,
      message: this.translate.instant(
        `${this.translationSection}.send_contact_success`
      ),
      duration: 3000,
    });
    this.resetContactForm();
  }

  public sendFormFailure(error: string) {
    this.alertService.setAlert({
      type: AlertType.Error,
      message: this.translate.instant(
        `${this.translationSection}.send_contact_failure`,
        { errorMessage: error }
      ),
      duration: 4000,
    });
  }

  public resetContactForm() {
    this.contactForm.reset({
      name: this.initialContactFormValue.name,
      email: this.initialContactFormValue.email,
      message: this.initialContactFormValue.message,
      topic: this.initialContactFormValue.topic,
      consent: this.initialContactFormValue.consent,
    });
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.controls[key];
      control.setErrors(null);
    });
  }

  public checkPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('passwordConfirm')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control?.invalid && control?.touched);
    const invalidParent = !!(
      control?.parent?.invalid &&
      control?.parent?.dirty &&
      control?.parent?.errors?.['notSame']
    );
    return invalidCtrl || invalidParent;
  }
}
