import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List } from 'src/app/shared/interfaces/list';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  public newTaskForm!: FormGroup;
  public newTask = '';
  public selectedList: List = { name: '' };
  constructor(
    private tasksService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.tasksService.getActualSelectedList().subscribe(selectedList => {
      this.selectedList = selectedList;
      console.log('AddTaskComponent selectedList: ', this.selectedList);
    });
  }

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
    this.tasksService.add(task, this.selectedList.name);
    this.newTask = '';
  }
}
