import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/interfaces/task';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getTasksState } from 'src/app/state/selectors';
import { TasksActions } from 'src/app/state/actions';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodoTaskComponent implements OnDestroy {
  @Input() TasksList!: Task[];
  @ViewChild('toDoTaskListGroup', { static: false })
  public set TaskListView(content: ElementRef) {
    this.toDoTaskListGroup = content;
  }
  public tasksListFiltered: Task[] = [];
  private subscriptions: Subscription = new Subscription();
  public toDoTaskListGroup!: ElementRef;
  public tasksList$: Observable<Task[]>;

  constructor(private tasksService: TaskService, private store: Store) {
    this.tasksList$ = this.store.select(getTasksState);
    this.tasksList$.subscribe(tasks => this.filterToDoTaskList(tasks));
  }

  private filterToDoTaskList(tasks: Array<Task>): void {
    this.tasksListFiltered = [...tasks].filter((task: Task) => {
      return task.isDone === false;
    });
  }

  public remove(task: Task) {
    this.tasksService.removeTaskWithModal(task);
  }

  public done(task: Task) {
    this.store.dispatch(TasksActions.doneTask({ task: task }));
  }
  public addAll(event: Event): void {
    event.stopPropagation();
    this.tasksService.addAllWithModal(this.tasksListFiltered);
  }
  public getColor(): string {
    return this.tasksListFiltered.length > 1 ? 'Black' : 'Green';
  }

  public roll(): void {
    this.toDoTaskListGroup?.nativeElement.classList.toggle('d-none');
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
