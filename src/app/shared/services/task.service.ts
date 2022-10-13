import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../interfaces/task';
import { DocumentData } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { config } from '../../config';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TaskService {
  private tasksListObservableLocal = new BehaviorSubject<Task[]>([]);
  private tasksListLoaded = new BehaviorSubject<boolean>(false);

  constructor(
    private fireBaseService: FirebaseService,
    private authService: AuthService
  ) {
    const taskslist = JSON.parse(localStorage.getItem('taskslist')!);
    if (taskslist) this.tasksListObservableLocal.next(taskslist);
  }

  add(task: Task): void {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.addCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${task.name}`,
        task
      );
    } else {
      const key = 'name';
      const taskslist = [
        ...new Map(
          [...this.tasksListObservableLocal.value, task].map((item: any) => [
            item[key],
            item,
          ])
        ).values(),
      ];
      this.tasksListObservableLocal.next(taskslist);
      localStorage.setItem('taskslist', JSON.stringify(taskslist));
    }
  }
  remove(task: Task) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.removeCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${task.name}`
      );
    } else {
      const taskslist = this.tasksListObservableLocal.value.filter(
        taskFromList => taskFromList.name != task.name
      );
      this.tasksListObservableLocal.next(taskslist);
      localStorage.setItem('taskslist', JSON.stringify(taskslist));
    }
  }
  done(task: Task) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.updateCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${task.name}`,
        {
          ...task,
          end: new Date().toLocaleString(),
          isDone: true,
        }
      );
    } else {
      const taskslist = this.tasksListObservableLocal.getValue();
      taskslist[
        taskslist.findIndex(taskFromList => taskFromList.name === task.name)
      ] = {
        ...task,
        end: new Date().toLocaleString(),
        isDone: true,
      };
      this.tasksListObservableLocal.next(taskslist);
      localStorage.setItem('taskslist', JSON.stringify(taskslist));
    }
  }

  undo(task: Task) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.updateCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${task.name}`,
        {
          ...task,
          end: null,
          isDone: false,
        }
      );
    } else {
      const taskslist = this.tasksListObservableLocal.getValue();
      taskslist[
        taskslist.findIndex(taskFromList => taskFromList.name === task.name)
      ] = {
        ...task,
        end: undefined,
        isDone: false,
      };
      this.tasksListObservableLocal.next(taskslist);
      localStorage.setItem('taskslist', JSON.stringify(taskslist));
    }
  }

  clearDoneList(list: Array<Task>): void {
    list.forEach((task: Task) => this.remove(task));
  }

  calcDone(list: Array<Task>): number {
    return list.length;
  }

  gettasksListObservableFb(): Observable<Array<Task>> {
    if (this.authService.isLoggedIn) {
      return this.fireBaseService
        .getFireBaseCollectionData(
          `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`
        )
        .pipe(
          map((data: DocumentData[]) => {
            this.tasksListLoaded.next(true);
            return <Task[]>[...data];
          })
        );
    } else {
      this.tasksListLoaded.next(true);
      return this.tasksListObservableLocal.asObservable();
    }
  }

  isTaskListLoaded(): Observable<boolean> {
    return this.tasksListLoaded.asObservable();
  }
}
