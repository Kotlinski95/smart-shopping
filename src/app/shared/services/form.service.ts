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

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private contactFormCollection: AngularFirestoreCollection<any> | undefined;
  private nameRegExp = /^[\s\p{L}]+$/u;
  private translationSection = 'alert.form';
  constructor(
    private firestore: AngularFirestore,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.contactFormCollection = this.firestore.collection('messages');
  }

  public getContantForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.pattern(this.nameRegExp),
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
    });
  }

  public submitContactForm(form: ContactForm): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.contactFormCollection
        ?.add(form)
        .then(response => {
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.send_contact_success`
            ),
            duration: 3000,
          });
          resolve();
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.send_contact_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }
}
