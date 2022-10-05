import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

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
    return this.tasksList.length > 1 ? 'Red' : 'Green';
  }

  public roll(): void {
    this.toDoTaskListGroup?.nativeElement.classList.toggle('d-none');
  }
}
