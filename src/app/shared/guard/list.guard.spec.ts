import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '../services/firebase.service';

import { ListGuard } from './list.guard';

describe('ListGuard', () => {
  let guard: ListGuard;
  const initialState = {};
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [FirebaseService, provideMockStore()],
    });
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(ListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
