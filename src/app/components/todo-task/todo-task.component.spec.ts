import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '../../shared/services/firebase.service';
import { TaskService } from '../../shared/services/task.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TodoTaskComponent } from './todo-task.component';

describe('TodoTaskComponent', () => {
  let component: TodoTaskComponent;
  let fixture: ComponentFixture<TodoTaskComponent>;
  const initialState = {};
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoTaskComponent],
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
      providers: [
        TaskService,
        FirebaseService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
