import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertType } from '../interfaces/alert';
import { ContactForm } from '../interfaces/form';
import { AlertService } from './alert.service';
import emailjs from '@emailjs/browser';
import { Observable } from 'rxjs';
import { Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private contactFormCollection: AngularFirestoreCollection<any> | undefined;
  private nameRegExp = /^[\s\p{L}]+$/u;
  private translationSection = 'alert.form';
  private initialValue = {
    name: null,
    email: '',
    message: '',
    topic: '',
    topicValue: '',
    consent: '',
  };
  private contactForm = new FormGroup({
    name: new FormControl(this.initialValue.name, [
      Validators.pattern(this.nameRegExp),
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(this.initialValue.email, [
      Validators.required,
      Validators.email,
    ]),
    message: new FormControl(this.initialValue.message, Validators.required),
    topic: new FormControl(this.initialValue.topic, Validators.required),
    topicValue: new FormControl(this.initialValue.topicValue),
    consent: new FormControl(this.initialValue.consent, Validators.required),
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

  public sendEmailTemplate(event: any, language: Language): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
      return emailjs
        .sendForm(
          'service_0lcu3bp',
          language.language === 'pl' ? 'template_u9qdz6m' : 'template_insnjq5',
          event.target as HTMLFormElement,
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
      name: this.initialValue.name,
      email: this.initialValue.email,
      message: this.initialValue.message,
      topic: this.initialValue.topic,
      consent: this.initialValue.consent,
    });
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.controls[key];
      control.setErrors(null);
    });
  }
}
