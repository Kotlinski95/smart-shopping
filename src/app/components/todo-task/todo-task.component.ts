import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/interfaces/task';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodoTaskComponent {
  tasksList: Task[] = [];
  public toDoTaskListGroup!: ElementRef;
  @ViewChild('toDoTaskListGroup', { static: false })
  public set TaskListView(content: ElementRef) {
    this.toDoTaskListGroup = content;
  }
  constructor(private tasksService: TaskService) {
    this.tasksService.gettasksListObservableFb().subscribe((tasks: Task[]) => {
      this.tasksList = [...tasks].filter((task: Task) => {
        return task.isDone === false;
      });
    });
  }

  remove(task: Task) {
    this.tasksService.remove(task);
  }
  done(task: Task) {
    this.tasksService.done(task);
  }
  addAll(): void {
    this.tasksList.forEach((task: Task) => this.tasksService.done(task));
  }
  getColor(): string {
    return this.tasksList.length > 1 ? 'Black' : 'Green';
  }

  public roll(): void {
    this.toDoTaskListGroup?.nativeElement.classList.toggle('d-none');
  }
}
