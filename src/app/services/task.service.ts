import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../models/task';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
} from '@angular/fire/firestore';

@Injectable()
export class TaskService {
  private taskList: Array<Task> = [];
  private tasksListSubject = new BehaviorSubject<Array<Task>>(this.taskList);
  private tasksListObservable$ = new Observable<Array<Task>>();

  constructor(firestore: Firestore) {
    this.tasksListSubject.next(this.taskList);
    const collectionFb: any = collection(firestore, 'tasks');
    this.tasksListObservable$ = collectionData(collectionFb);
    getDocs(collectionFb).then((data)=> {
    })
  }

  add(task: Task): void {
    this.taskList.push(task);
    this.tasksListSubject.next(this.taskList);
  }
  remove(task: Task) {
    this.taskList = this.taskList.filter((element) => element !== task);
    this.tasksListSubject.next(this.taskList);
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.tasksListSubject.getValue();
    this.tasksListSubject.next(list);
    return task
  }
  calcDone(list: Array<Task>): number {
    return list.length;
  }
  getTasksListObservable(): Observable<Array<Task>> {
    return this.tasksListSubject.asObservable();
  }

  gettasksListObservableFb(): Observable<Array<Task>> {
    return this.tasksListObservable$;
  }
}
