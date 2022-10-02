import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  DocumentData,
} from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore;
  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  getFireBaseCollectionData(
    collectionName: string
  ): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, collectionName));
  }

  addCollectionData(collectionName: string, field: string, data: object) {
    setDoc(doc(this.firestore, collectionName, field), data);
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
