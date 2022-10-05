import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.scss'],
})
export class DoneTaskComponent {
  tasksDone: Task[] = [];
  public doneTaskListGroup!: ElementRef;
  @ViewChild('toDoTaskListGroup', { static: false })
  public set TaskListDoneView(content: ElementRef) {
    this.doneTaskListGroup = content;
  }
  constructor(private tasksService: TaskService) {
    this.tasksService
      .gettasksListObservableFb()
      .subscribe((tasksDone: Task[]) => {
        this.tasksDone = tasksDone.filter((task: Task) => {
          return task.isDone === true;
        });
      });
  }

  calcDone(list: Array<Task>): number {
    return list.length;
  }

  clearDoneList(): void {
    this.tasksService.clearDoneList(this.tasksDone);
  }

  remove(task: Task) {
    this.tasksService.remove(task);
  }

  undo(task: Task) {
    this.tasksService.undo(task);
  }

  public roll(): void {
    this.doneTaskListGroup?.nativeElement.classList.toggle('d-none');
  }
}
