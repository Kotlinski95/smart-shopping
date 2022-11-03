import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/shared/services/task.service';
import { List } from 'src/app/shared/interfaces/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnDestroy, OnInit {
  public tasksList: List[] = [];
  public newTaskForm!: FormGroup;
  public newList = '';
  private subscriptions: Subscription = new Subscription();
  constructor(
    private tasksService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.filterDoneTaskList();
  }

  private filterDoneTaskList(): void {
    this.subscriptions.add(
      this.tasksService.getListObservableFb().subscribe((tasksList: List[]) => {
        console.log('TASK LIST: ', tasksList);
        this.tasksList = tasksList;
      })
    );
  }

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group({
      newList: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public selectList(list: List): void {
    this.tasksService.setActualSelectedList(list);
  }

  public remove(list: List): void {
    this.tasksService.remove(list);
  }

  addList() {
    const list: List = {
      name: this.newList,
    };
    this.tasksService.addList(list);
    this.newList = '';
  }
}
