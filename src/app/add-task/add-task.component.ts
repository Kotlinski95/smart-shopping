import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  newTask: string ="";
  /* @Output() emitTask = new EventEmitter<string>();  not necessary with service */
  constructor(private tasksTaskService: TaskService) { }

  ngOnInit(): void {
  }

  add(inputField: HTMLInputElement) {
    console.log("Inputfield: ", inputField)
    const task = { name: this.newTask, created: new Date()}
    // this.emitTask.emit(this.newTask); not necessary with service
    this.tasksTaskService.add(task);
    this.newTask = "";
  }

}
