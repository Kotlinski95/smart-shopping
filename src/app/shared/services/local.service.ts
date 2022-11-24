import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SsrSupportService } from './ssr-support.service';
import { Task } from '../interfaces/task';
import { AlertService } from './alert.service';
import { AlertType } from '../interfaces/alert';
import { TranslateService } from '@ngx-translate/core';
import { List } from '../interfaces/list';
import { Store } from '@ngrx/store';
import { getListState, getTasksState } from 'src/app/state/selectors';
import { ListsActions } from 'src/app/state/actions';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private initList = { name: '', tasks: [] };
  private tasksObservableLocal = new BehaviorSubject<Task[]>([]);
  public tasksObservableLocal$ = this.tasksObservableLocal.asObservable();
  private ListsObservableLocal = new BehaviorSubject<List[]>([]);
  public ListsObservableLocal$ = this.ListsObservableLocal.asObservable();
  private ListObservableLocal = new BehaviorSubject<List>(this.initList);
  public ListObservableLocal$ = this.ListObservableLocal.asObservable();
  private translationSection = 'alert.shopping_list';
  constructor(
    private ssrSupportService: SsrSupportService,
    private alertService: AlertService,
    private translate: TranslateService,
    private store: Store,
    private authService: AuthService
  ) {
    if (!this.authService.isLoggedIn) {
      const listsLocal = JSON.parse(
        this.ssrSupportService.getLocalStorageItem('lists')!
      );
      if (listsLocal) {
        this.ListsObservableLocal.next(listsLocal);
        this.store.dispatch(ListsActions.setLists());
      }
      const list = this.ssrSupportService.getLocalStorageItem('list');
      if (list) {
        this.store.dispatch(
          ListsActions.setList({ list: JSON.parse(list ? list : '') })
        );
      }
      this.store.select(getListState)?.subscribe(list => {
        this.ListObservableLocal.next(list);
        if (list && list.tasks) {
          this.updateTasks(list.tasks);
        }
      });
      this.store.select(getTasksState)?.subscribe(tasks => {
        if (tasks) this.tasksObservableLocal.next(tasks);
      });
    }
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
    this.updateTasks(taskslist);
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
    this.updateTasks(taskslist);
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
    this.updateTasks(taskslist);
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
    this.updateTasks(taskslist);
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
        [...this.ListsObservableLocal.value, list].map((item: any) => {
          const newList = { ...item, tasks: [] };
          return [newList[key], newList];
        })
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

  public updateTasks(taskslist: Task[]): void {
    this.tasksObservableLocal.next(taskslist);

    const newLists = [
      ...this.ListsObservableLocal.getValue().map(list => {
        if (list.name === this.ListObservableLocal.getValue().name) {
          return { ...list, tasks: taskslist };
        } else {
          return list;
        }
      }),
    ];

    this.ssrSupportService.setLocalStorageItem(
      'lists',
      JSON.stringify(newLists)
    );
    this.ListsObservableLocal.next(newLists);
    const newList = newLists.find(list => {
      return list.name === this.ListObservableLocal.getValue().name;
    });
    if (newList) this.updateList(newList);
  }

  public updateList(list: List): void {
    this.ListObservableLocal.next(list);
    this.ssrSupportService.setLocalStorageItem('list', JSON.stringify(list));
  }

  public cleanList(): void {
    this.ssrSupportService.setLocalStorageItem(
      'list',
      JSON.stringify(this.initList)
    );
    if (!this.authService.isLoggedIn) {
      const listsLocal = JSON.parse(
        this.ssrSupportService.getLocalStorageItem('lists')!
      );
      if (listsLocal) {
        this.ListsObservableLocal.next(listsLocal);
        this.store.dispatch(ListsActions.setLists());
      }
    }
  }
}
