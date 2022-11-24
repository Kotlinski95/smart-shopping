import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/interfaces/task';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getTasksState } from 'src/app/state/selectors';
import { TasksActions } from 'src/app/state/actions';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.scss'],
})
export class DoneTaskComponent implements OnDestroy {
  @Input() TasksList!: Task[];
  tasksDone: Task[] = [];
  public doneTaskListGroup!: ElementRef;
  private subscriptions: Subscription = new Subscription();
  @ViewChild('toDoTaskListGroup', { static: false })
  public set TaskListDoneView(content: ElementRef) {
    this.doneTaskListGroup = content;
  }
  public tasksList$: Observable<Task[] | undefined>;
  constructor(private tasksService: TaskService, private store: Store) {
    this.tasksList$ = this.store.select(getTasksState);
    this.tasksList$.subscribe(tasks => {
      if (tasks) this.filterDoneTaskList(tasks);
    });
  }

  private filterDoneTaskList(tasks: Array<Task>): void {
    this.tasksDone = tasks.filter((task: Task) => {
      return task.isDone === true;
    });
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
    this.store.dispatch(TasksActions.undoTask({ task: task }));
  }

  public roll(): void {
    this.doneTaskListGroup?.nativeElement.classList.toggle('d-none');
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
