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

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore;
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

  addCollectionData(collectionName: string, field: string, data: object) {
    const translationSection = 'alert.shopping_list';
    setDoc(doc(this.firestore, collectionName, field), data)
      .then(() => {
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${translationSection}.add_task_success`
          ),
          duration: 3000,
        });
      })
      .catch(error => {
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${translationSection}.add_task_failure`,
            { errorMessage: error.message }
          ),
          duration: 3000,
        });
      });
  }

  removeCollectionData(collectionName: string, field: string) {
    deleteDoc(doc(this.firestore, collectionName, field));
  }

  updateCollectionData(collectionName: string, field: string, newData: object) {
    updateDoc(doc(this.firestore, collectionName, field), {
      ...newData,
    });
  }
}
