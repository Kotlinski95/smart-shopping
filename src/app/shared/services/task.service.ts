import { TasksActions } from 'src/app/state/actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../interfaces/task';
import { DocumentData } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { config } from '../../config';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from './auth.service';
import { ModalService } from './modal.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalParams } from '../interfaces/modal';
import { AlertService } from './alert.service';
import { AlertType } from '../interfaces/alert';
import { List } from '../interfaces/list';
import { Store } from '@ngrx/store';
import { getListState } from 'src/app/state/selectors/lists.selectors';
import { LocalService } from './local.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable()
export class TaskService {
  private initList: List = { name: config.firebase.collectionName };
  private currentList = new BehaviorSubject(this.initList);
  private tasksListLoaded = new BehaviorSubject<boolean>(false);
  private translationSection = 'alert.shopping_list';

  constructor(
    private fireBaseService: FirebaseService,
    private authService: AuthService,
    private modalService: ModalService,
    private translate: TranslateService,
    private alertService: AlertService,
    private store: Store,
    private localService: LocalService,
    private gaService: GoogleAnalyticsService
  ) {
    this.store.select(getListState)?.subscribe(list => {
      this.currentList.next(list);
    });
  }

  public add(task: Task): void {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.addCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${
          this.currentList.getValue().name
        }`,
        `${task.name}`,
        task
      );
    } else {
      this.localService.add(task);
    }
    this.gaService.event('add_task', 'task', 'Add');
  }

  public remove(task: Task, showAlert = true) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.removeCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${
          this.currentList.getValue().name
        }`,
        `${task.name}`,
        showAlert
      );
    } else {
      this.localService.remove(task);
    }
    this.gaService.event('remove_task', 'task', 'Remove');
  }
  public done(task: Task, showAlert = true) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.updateCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${
          this.currentList.getValue().name
        }`,
        `${task.name}`,
        {
          ...task,
          end: new Date().toLocaleString(),
          isDone: true,
        },
        showAlert
      );
    } else {
      this.localService.done(task);
    }
    this.gaService.event('done_task', 'task', 'Done');
  }

  public undo(task: Task) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.updateCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${
          this.currentList.getValue().name
        }`,
        `${task.name}`,
        {
          ...task,
          end: '',
          isDone: false,
        }
      );
    } else {
      this.localService.undo(task);
    }
    this.gaService.event('undo_task', 'task', 'Undo');
  }

  public clearDoneList(list: Array<Task>, showAlert = true): Promise<void> {
    return new Promise(resolve => {
      list.forEach((task: Task) => this.remove(task, showAlert));
      resolve();
    });
  }

  public calcDone(list: Array<Task>): number {
    return list.length;
  }

  public getTasksListObservableFb(listName?: string): Observable<Array<Task>> {
    if (this.authService.isLoggedIn) {
      return this.fireBaseService
        .getFireBaseCollectionData(
          `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${
            listName ? listName : this.currentList.getValue().name
          }`
        )
        .pipe(
          map((data: DocumentData[]) => {
            return <Task[]>[...data];
          })
        );
    } else {
      return this.localService.tasksObservableLocal$;
    }
  }

  public isTaskListLoaded(): Observable<boolean> {
    return this.tasksListLoaded.asObservable();
  }

  public removeTaskWithModal(task: Task): void {
    const translationSection = 'shopping_list.remove_task_popup';
    const modalParams: ModalParams = {
      title: this.translate.instant(`${translationSection}.title`),
      btnClose: true,
      btnCloseLabel: this.translate.instant(
        `${translationSection}.btnCloseLabel`
      ),
      btnConfirm: true,
      btnConfirmLabel: this.translate.instant(
        `${translationSection}.btnConfirmLabel`
      ),
      content: this.translate.instant(`${translationSection}.content`, {
        taskName: task.name,
      }),
    };
    this.modalService.setModal(modalParams, () =>
      this.store.dispatch(TasksActions.removeTask({ task: task }))
    );
  }

  public clearTasksWithModal(list: Array<Task>): void {
    const translationSection = 'shopping_list.clear_tasks_popup';
    const modalParams: ModalParams = {
      title: this.translate.instant(`${translationSection}.title`),
      btnClose: true,
      btnCloseLabel: this.translate.instant(
        `${translationSection}.btnCloseLabel`
      ),
      btnConfirm: true,
      btnConfirmLabel: this.translate.instant(
        `${translationSection}.btnConfirmLabel`
      ),
      content: this.translate.instant(`${translationSection}.content`),
    };
    this.modalService.setModal(modalParams, () => {
      this.store.dispatch(TasksActions.removeAllTasks({ list: list }));
    });
  }

  public clearTasksPromise(list: Array<Task>) {
    this.clearDoneList(list, false)
      .then(() => {
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${this.translationSection}.remove_all_tasks_success`
          ),
          duration: 3000,
        });
      })
      .catch(error => {
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${this.translationSection}.remove_all_tasks_failue`,
            {
              errorMessage: error,
            }
          ),
          duration: 3000,
        });
      });
  }

  public addAllWithModal(tasksList: Array<Task>): void {
    const translationSection = 'shopping_list.add_all_tasks_popup';
    const modalParams: ModalParams = {
      title: this.translate.instant(`${translationSection}.title`),
      btnClose: true,
      btnCloseLabel: this.translate.instant(
        `${translationSection}.btnCloseLabel`
      ),
      btnConfirm: true,
      btnConfirmLabel: this.translate.instant(
        `${translationSection}.btnConfirmLabel`
      ),
      content: this.translate.instant(`${translationSection}.content`),
    };
    this.modalService.setModal(modalParams, () =>
      this.store.dispatch(TasksActions.addAllTasks({ list: tasksList }))
    );
  }
  public addAllTasksPromise(tasksList: Array<Task>) {
    this.addAllTasks(tasksList)
      .then(() => {
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${this.translationSection}.add_all_tasks_success`
          ),
          duration: 3000,
        });
      })
      .catch(error => {
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${this.translationSection}.add_all_tasks_failue`,
            {
              errorMessage: error,
            }
          ),
          duration: 3000,
        });
      });
  }

  public addAllTasks(tasksList: Array<Task>): Promise<void> {
    return new Promise(resolve => {
      tasksList.forEach((task: Task) => this.done(task, false));
      resolve();
    });
  }
}
