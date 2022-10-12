import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  public newTaskForm!: FormGroup;
  public newTask = '';
  constructor(
    private tasksTaskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group({
      newTask: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    const task = {
      name: this.newTask,
      created: new Date().toLocaleString(),
      isDone: false,
    };
    this.tasksTaskService.add(task);
    this.newTask = '';
  }
}
