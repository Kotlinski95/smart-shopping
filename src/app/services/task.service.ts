import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Task } from '../models/task';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

@Injectable()
export class TaskService {
  private taskList: Array<Task> = [];
  //private taskDone: Task[] = [];

  // BehaviorSubject enable to subscribe this array after our initial array is fullfilled in constructor.
  private tasksListSubject = new BehaviorSubject<Array<Task>>(this.taskList);
  //private tasksDoneObservable = new BehaviorSubject<Array<Task>>([]); //BehaviorSubject requires initial value, it could be event empty object.
  private tasksListObservable$ = new Observable<Array<Task>>();

  constructor(firestore: Firestore) {
    this.tasksListSubject.next(this.taskList);
    const collectionFb: any = collection(firestore, 'tasks');
    this.tasksListObservable$ = collectionData(collectionFb);
    getDocs(collectionFb).then((data)=> {
    console.warn('NEW TASKS', data);
    })

    console.warn("SEPARATEDOC : ", doc(firestore, 'tasks', '/pieczarki'));

  }

  add(task: Task): void {
    this.taskList.push(task);
    this.tasksListSubject.next(this.taskList);
    console.log('TASK ADDED: ', this.taskList);
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
  // getTasksDoneObservable(): Observable<Array<Task>> {
  //   return this.tasksDoneObservable.asObservable();
  // }
}
