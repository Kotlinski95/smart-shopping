import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  newTask: string = "";
  @Output() emitTask = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  add(inputField: HTMLInputElement) {
    console.log("Inputfield: ", inputField)
    this.emitTask.emit(this.newTask);
    this.newTask = "";
  }

}
