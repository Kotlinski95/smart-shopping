import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../models/task';
import { DocumentData } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { config } from '../config';
import { map } from 'rxjs';

@Injectable()
export class TaskService {
  private tasksListObservable$ = new Observable<DocumentData[] | Task[]>();

  constructor(private fireBaseService: FirebaseService) {
    this.tasksListObservable$ = fireBaseService.getFireBaseCollectionData(
      config.firebase.collectionName
    );
  }

  add(task: Task): void {
    this.fireBaseService.addCollectionData(
      config.firebase.collectionName,
      `${task.name}`,
      task
    );
  }
  remove(task: Task) {
    this.fireBaseService.removeCollectionData(
      config.firebase.collectionName,
      `${task.name}`
    );
  }
  done(task: Task) {
    this.fireBaseService.updateCollectionData(
      config.firebase.collectionName,
      `${task.name}`,
      {
        ...task,
        end: new Date().toLocaleString(),
        isDone: true,
      }
    );
  }
  calcDone(list: Array<Task>): number {
    return list.length;
  }

  gettasksListObservableFb(): Observable<Array<Task>> {
    return this.tasksListObservable$.pipe(
      map((data: DocumentData[]) => {
        return <Task[]>[...data];
      })
    );
  }
}
