import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../interfaces/task';
import { DocumentData } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { config } from '../../config';
import { BehaviorSubject, map } from 'rxjs';
import { AuthService } from './auth.service';
import { SsrSupportService } from './ssr-support.service';
import { ModalService } from './modal.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalParams } from '../interfaces/modal';
import { AlertService } from './alert.service';
import { AlertType } from '../interfaces/alert';

@Injectable()
export class TaskService {
  private tasksListObservableLocal = new BehaviorSubject<Task[]>([]);
  private tasksListLoaded = new BehaviorSubject<boolean>(false);
  private translationSection = 'alert.shopping_list';

  constructor(
    private fireBaseService: FirebaseService,
    private authService: AuthService,
    private ssrSupportService: SsrSupportService,
    private modalService: ModalService,
    private translate: TranslateService,
    private alertService: AlertService
  ) {
    const taskslist = JSON.parse(
      this.ssrSupportService.getLocalStorageItem('taskslist')!
    );
    if (taskslist) this.tasksListObservableLocal.next(taskslist);
  }

  public add(task: Task): void {
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
      this.ssrSupportService.setLocalStorageItem(
        'taskslist',
        JSON.stringify(taskslist)
      );
    }
  }
  public remove(task: Task, showAlert = true) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.removeCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${task.name}`,
        showAlert
      );
    } else {
      const taskslist = this.tasksListObservableLocal.value.filter(
        taskFromList => taskFromList.name != task.name
      );
      this.tasksListObservableLocal.next(taskslist);
      this.ssrSupportService.setLocalStorageItem(
        'taskslist',
        JSON.stringify(taskslist)
      );
    }
  }
  public done(task: Task, showAlert = true) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.updateCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${task.name}`,
        {
          ...task,
          end: new Date().toLocaleString(),
          isDone: true,
        },
        showAlert
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
      this.ssrSupportService.setLocalStorageItem(
        'taskslist',
        JSON.stringify(taskslist)
      );
    }
  }

  public undo(task: Task) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.updateCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${task.name}`,
        {
          ...task,
          end: '',
          isDone: false,
        }
      );
    } else {
      const taskslist = this.tasksListObservableLocal.getValue();
      taskslist[
        taskslist.findIndex(taskFromList => taskFromList.name === task.name)
      ] = {
        ...task,
        end: '',
        isDone: false,
      };
      this.tasksListObservableLocal.next(taskslist);
      this.ssrSupportService.setLocalStorageItem(
        'taskslist',
        JSON.stringify(taskslist)
      );
    }
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

  public gettasksListObservableFb(): Observable<Array<Task>> {
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
    this.modalService.setModal(modalParams, () => this.remove(task));
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
    this.modalService.setModal(modalParams, () => {
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
    });
  }

  public addAllTasks(tasksList: Array<Task>): Promise<void> {
    return new Promise(resolve => {
      tasksList.forEach((task: Task) => this.done(task, false));
      resolve();
    });
  }
}
