import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/interfaces/task';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.scss'],
})
export class DoneTaskComponent implements OnDestroy {
  tasksDone: Task[] = [];
  public doneTaskListGroup!: ElementRef;
  private subscriptions: Subscription = new Subscription();
  @ViewChild('toDoTaskListGroup', { static: false })
  public set TaskListDoneView(content: ElementRef) {
    this.doneTaskListGroup = content;
  }
  constructor(
    private tasksService: TaskService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {
    this.filterDoneTaskList();
  }

  private filterDoneTaskList(): void {
    this.subscriptions.add(
      this.tasksService
        .gettasksListObservableFb()
        .subscribe((tasksDone: Task[]) => {
          this.tasksDone = tasksDone.filter((task: Task) => {
            return task.isDone === true;
          });
        })
    );
  }

  public calcDone(list: Array<Task>): number {
    return list.length;
  }

  public clearDoneList(event: Event): void {
    event.stopPropagation();
    this.tasksService.clearTasksWithModal(this.tasksDone);
  }

  public remove(task: Task) {
    this.tasksService.removeTaskWithModal(task);
  }

  public undo(task: Task) {
    this.tasksService.undo(task);
  }

  public roll(): void {
    this.doneTaskListGroup?.nativeElement.classList.toggle('d-none');
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
