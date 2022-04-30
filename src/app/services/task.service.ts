import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Task } from '../models/task';

@Injectable()
export class TaskService {
  private taskList: Array<Task> = [];
  //private taskDone: Task[] = [];

  // BehaviorSubject enable to subscribe this array after our initial array is fullfilled in constructor.
  private tasksListObservable = new BehaviorSubject<Array<Task>>(this.taskList);
  //private tasksDoneObservable = new BehaviorSubject<Array<Task>>([]); //BehaviorSubject requires initial value, it could be event empty object.

  constructor() {
    this.tasksListObservable.next(this.taskList);
  }

  add(task: Task):void {
    this.taskList.push(task);
    this.tasksListObservable.next(this.taskList);
    console.log("TASK ADDED: ", this.taskList);
  }
  remove(task: Task) {
    this.taskList = this.taskList.filter(element =>  element !== task );
    this.tasksListObservable.next(this.taskList);
  }
  done(task: Task) {
    // this.remove(task);
    // this.taskDone.push(task);
    // console.log("task done: ", task);
    // this.tasksDoneObservable.next(this.taskDone);
    task.end = new Date().toLocaleString();
    task.isDone = true;
    const list = this.tasksListObservable.getValue();
    this.tasksListObservable.next(list);
  }
  calcDone(list: Array<Task>): number {
    return list.length;
  }
  getTasksListObservable(): Observable<Array<Task>> {
    return this.tasksListObservable.asObservable();
  }
  // getTasksDoneObservable(): Observable<Array<Task>> {
  //   return this.tasksDoneObservable.asObservable();
  // }
}
