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
import { eventNames } from 'process';

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
  constructor(private tasksService: TaskService) {
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
    this.tasksService.removeTaskWithModal(task);
  }

  public done(task: Task) {
    this.tasksService.done(task);
  }
  public addAll(event: Event): void {
    event.stopPropagation();
    this.tasksService.addAllWithModal(this.tasksList);
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
