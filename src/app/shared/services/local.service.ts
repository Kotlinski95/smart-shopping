import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SsrSupportService } from './ssr-support.service';
import { Task } from '../interfaces/task';
import { AlertService } from './alert.service';
import { AlertType } from '../interfaces/alert';
import { TranslateService } from '@ngx-translate/core';
import { List } from '../interfaces/list';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private tasksObservableLocal = new BehaviorSubject<Task[]>([]);

  public tasksObservableLocal$ = this.tasksObservableLocal.asObservable();
  private ListsObservableLocal = new BehaviorSubject<List[]>([]);
  public ListsObservableLocal$ = this.ListsObservableLocal.asObservable();
  private translationSection = 'alert.shopping_list';
  constructor(
    private ssrSupportService: SsrSupportService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    const taskslist = JSON.parse(
      this.ssrSupportService.getLocalStorageItem('taskslist')!
    );
    if (taskslist) this.tasksObservableLocal.next(taskslist);
    const listsLocal = JSON.parse(
      this.ssrSupportService.getLocalStorageItem('lists')!
    );
    if (listsLocal) this.ListsObservableLocal.next(listsLocal);
  }

  public add(task: Task, showAlert = true): void {
    const key = 'name';
    const taskslist = [
      ...new Map(
        [...this.tasksObservableLocal.value, task].map((item: any) => [
          item[key],
          item,
        ])
      ).values(),
    ];
    this.tasksObservableLocal.next(taskslist);
    this.ssrSupportService.setLocalStorageItem(
      'taskslist',
      JSON.stringify(taskslist)
    );
    if (showAlert) {
      this.alertService.setAlert({
        type: AlertType.Success,
        message: this.translate.instant(
          `${this.translationSection}.add_task_success`,
          {
            task: task.name,
          }
        ),
        duration: 3000,
      });
    }
  }

  public remove(task: Task, showAlert = true) {
    const taskslist = this.tasksObservableLocal.value.filter(
      taskFromList => taskFromList.name != task.name
    );
    this.tasksObservableLocal.next(taskslist);
    this.ssrSupportService.setLocalStorageItem(
      'taskslist',
      JSON.stringify(taskslist)
    );
    if (showAlert) {
      this.alertService.setAlert({
        type: AlertType.Success,
        message: this.translate.instant(
          `${this.translationSection}.remove_task_success`,
          {
            task: task.name,
          }
        ),
        duration: 3000,
      });
    }
  }

  public done(task: Task, showAlert = true) {
    const taskslist = this.tasksObservableLocal.getValue();
    taskslist[
      taskslist.findIndex(taskFromList => taskFromList.name === task.name)
    ] = {
      ...task,
      end: new Date().toLocaleString(),
      isDone: true,
    };
    this.tasksObservableLocal.next(taskslist);
    this.ssrSupportService.setLocalStorageItem(
      'taskslist',
      JSON.stringify(taskslist)
    );
    if (showAlert) {
      this.alertService.setAlert({
        type: AlertType.Success,
        message: this.translate.instant(
          `${this.translationSection}.task_to_done_success`,
          {
            task: task.name,
          }
        ),
        duration: 3000,
      });
    }
  }

  public undo(task: Task, showAlert = true) {
    const taskslist = this.tasksObservableLocal.getValue();
    taskslist[
      taskslist.findIndex(taskFromList => taskFromList.name === task.name)
    ] = {
      ...task,
      end: '',
      isDone: false,
    };
    this.tasksObservableLocal.next(taskslist);
    this.ssrSupportService.setLocalStorageItem(
      'taskslist',
      JSON.stringify(taskslist)
    );
    if (showAlert) {
      this.alertService.setAlert({
        type: AlertType.Success,
        message: this.translate.instant(
          `${this.translationSection}.task_to_todo_success`,
          {
            task: task.name,
          }
        ),
        duration: 3000,
      });
    }
  }

  public addList(list: List, alert = true): void {
    const key = 'name';
    const lists = [
      ...new Map(
        [...this.ListsObservableLocal.value, list].map((item: any) => [
          item[key],
          item,
        ])
      ).values(),
    ];
    this.ListsObservableLocal.next(lists);
    this.ssrSupportService.setLocalStorageItem('lists', JSON.stringify(lists));
  }

  public removeList(list: List, showAlert = true) {
    const listLocal = this.ListsObservableLocal.value.filter(
      localList => localList.name != list.name
    );
    this.ListsObservableLocal.next(listLocal);
    this.ssrSupportService.setLocalStorageItem(
      'lists',
      JSON.stringify(listLocal)
    );
  }
}
