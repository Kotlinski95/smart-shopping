import { Component} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.scss']
})
export class DoneTaskComponent{
  tasksDone: Task[] = []
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

}
