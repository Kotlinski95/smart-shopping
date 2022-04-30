import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoTaskComponent implements OnInit {
  /* @Input() tasksList: Array<string> = [];  not necessary with services */
  /* @Output() emitDone = new EventEmitter<string>();   not necessary with services */
  /* @Output() emitRemove = new EventEmitter<string>();  not necessary with services */

  tasksList: Task[] = [];

  constructor(private tasksService: TaskService) {
    this.tasksService.getTasksListObservable().subscribe((tasks: Task[]) => {
      this.tasksList = [...tasks].filter((task: Task) => {
        return task.isDone === false }); // empty slice() method, to change referenece to array ( generally create new ) - to properly sortName pipe working in pure mode
    })
  }

  ngOnInit(): void {
  }

  remove(task: Task) {
    // this.emitRemove.emit(task);  not necessary with services
    this.tasksService.remove(task);
  }
  done(task: Task){
    // this.emitDone.emit(task);  not necessary with services
    this.tasksService.done(task);
  }
  getColor(): string {
    return this.tasksList.length > 1 ? 'Red' : 'Green';
  }
}
