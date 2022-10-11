import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { TaskService } from '../services/task.service';

import { DoneTaskComponent } from './done-task.component';

describe('DoneTaskComponent', () => {
  let component: DoneTaskComponent;
  let fixture: ComponentFixture<DoneTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoneTaskComponent],
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        RouterTestingModule,
      ],
      providers: [TaskService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
