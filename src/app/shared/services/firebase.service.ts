import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  DocumentData,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AlertType } from '../interfaces/alert';
import { AlertService } from './alert.service';
import { Task } from '../interfaces/task';
import { List } from '../interfaces/list';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore;
  private translationSection = 'alert.shopping_list';
  constructor(
    firestore: Firestore,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.firestore = firestore;
  }

  getFireBaseCollectionData(
    collectionName: string
  ): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, collectionName));
  }

  createCollection(path: string, name: string, alert = true): void {
    setDoc(doc(this.firestore, path), {})
      .then(() => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.create_list_success`,
              {
                collectonName: name,
              }
            ),
            duration: 3000,
          });
        }
      })
      .catch(error => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.create_list_failure`,
              { errorMessage: error.message }
            ),
            duration: 3000,
          });
        }
      });
  }

  addCollectionData(
    collectionName: string,
    field: string,
    data: Task | List,
    alert = true
  ) {
    setDoc(doc(this.firestore, collectionName, field), data)
      .then(() => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.add_task_success`,
              {
                task: data.name,
              }
            ),
            duration: 3000,
          });
        }
      })
      .catch(error => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.add_task_failure`,
              { errorMessage: error.message }
            ),
            duration: 3000,
          });
        }
      });
  }

  removeCollectionData(collectionName: string, field: string, alert = true) {
    deleteDoc(doc(this.firestore, collectionName, field))
      .then(() => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.remove_task_success`,
              {
                task: field,
              }
            ),
            duration: 3000,
          });
        }
      })
      .catch(error => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.remove_task_failure`,
              { errorMessage: error.message }
            ),
            duration: 3000,
          });
        }
      });
  }

  updateCollectionData(
    collectionName: string,
    field: string,
    newData: Task,
    alert = true
  ) {
    updateDoc(doc(this.firestore, collectionName, field), {
      ...newData,
    })
      .then(() => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              newData.isDone
                ? `${this.translationSection}.task_to_done_success`
                : `${this.translationSection}.task_to_todo_success`,
              {
                task: field,
              }
            ),
            duration: 3000,
          });
        }
      })
      .catch(error => {
        if (alert) {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              newData.isDone
                ? `${this.translationSection}.task_to_done_failure`
                : `${this.translationSection}.task_to_todo_failure`,
              { errorMessage: error.message }
            ),
            duration: 3000,
          });
        }
      });
  }
}
