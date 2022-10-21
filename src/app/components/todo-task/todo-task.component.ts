import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/interfaces/task';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodoTaskComponent implements OnDestroy {
  public tasksList: Task[] = [];
  private subscriptions: Subscription = new Subscription();
  public toDoTaskListGroup!: ElementRef;
  @ViewChild('toDoTaskListGroup', { static: false })
  public set TaskListView(content: ElementRef) {
    this.toDoTaskListGroup = content;
  }
  constructor(
    private tasksService: TaskService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {
    this.filterToDoTaskList();
  }

  private filterToDoTaskList(): void {
    this.subscriptions.add(
      this.tasksService
        .gettasksListObservableFb()
        .subscribe((tasks: Task[]) => {
          this.tasksList = [...tasks].filter((task: Task) => {
            return task.isDone === false;
          });
        })
    );
  }

  public remove(task: Task) {
    this.createRemoveModal().then(() => {
      this.setModalContent(task.name).then(() => {
        this.showModal();
      });
    });
    this.handleRemoveModalAction(task);
  }

  private createRemoveModal(): Promise<void> {
    return new Promise(resolve => {
      this.modalService.createModal({
        title: this.translate.instant('shopping_list.remove_task_popup.title'),
        btnClose: true,
        btnCloseLabel: this.translate.instant(
          'shopping_list.remove_task_popup.btnCloseLabel'
        ),
        btnConfirm: true,
        btnConfirmLabel: this.translate.instant(
          'shopping_list.remove_task_popup.btnConfirmLabel'
        ),
      });
      resolve();
    });
  }

  private setModalContent(taskName: string): Promise<void> {
    return new Promise(resolve => {
      this.modalService.setModalContent(
        this.translate.instant('shopping_list.remove_task_popup.content', {
          taskName: taskName,
        })
      );
      resolve();
    });
  }

  private showModal(): void {
    this.modalService.showModal();
  }

  private handleRemoveModalAction(task: Task): void {
    this.modalService.setModalCallback(() => {
      this.tasksService.remove(task);
      this.modalService.hideModal();
    });
  }

  public done(task: Task) {
    this.tasksService.done(task);
  }
  public addAll(): void {
    this.tasksList.forEach((task: Task) => this.tasksService.done(task));
  }
  public getColor(): string {
    return this.tasksList.length > 1 ? 'Black' : 'Green';
  }

  public roll(): void {
    this.toDoTaskListGroup?.nativeElement.classList.toggle('d-none');
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
