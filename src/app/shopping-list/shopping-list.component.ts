import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent{
  newTask: string = "";
  taskList: Array<string> = [];
  taskDone: string[] = [];
  add():void {
    this.taskList.push(this.newTask);
    console.table(this.taskList);
    this.newTask = '';
  }
  remove(task: string): void {
    this.taskList = this.taskList.filter(element =>  element !== task );
    console.log("task removed: ", task);
  }
  done(task: string){
    this.remove(task);
    this.taskDone.push(task);
  }
  calcDone(list: Array<string>): number {
    return list.length;
  }

}
