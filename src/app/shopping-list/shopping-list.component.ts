import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService]
})
export class ShoppingListComponent{
  title = "Shopping List";

  // * not necessary with services
  // taskList: Array<string> = [];
  // taskDone: string[] = [];

  @ViewChild('addTaskRef')
  AddTaskComponent!: AddTaskComponent;

  @ViewChild('inputField2') input!: ElementRef;

  ngOnInit(): void {
    console.log("#addTaskRef: ", this.AddTaskComponent, "#inputField: ", this.input);
  }
  /* Main app logic */ // - not necessary with services
  // add(task: string):void {
  //   this.taskList.push(task);
  //   console.log("#addTaskRef: ", this.AddTaskComponent, "#inputField: ", this.input);
  // }
  // remove(task: string) {
  //   this.taskList = this.taskList.filter(element =>  element !== task );
  //   console.log("task removed: ", task);
  // }
  // done(task: string){
  //   this.remove(task);
  //   this.taskDone.push(task);
  //   console.log("task done: ", task);
  // }
  // calcDone(list: Array<string>): number {
  //   return list.length;
  // }

}
