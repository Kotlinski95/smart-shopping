import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { List } from 'src/app/shared/interfaces/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/shared/services/list.service';

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
    private listService: ListService,
    private formBuilder: FormBuilder
  ) {
    this.filterDoneTaskList();
  }

  private filterDoneTaskList(): void {
    this.subscriptions.add(
      this.listService.getListObservableFb().subscribe((tasksList: List[]) => {
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
    this.listService.setActualSelectedList(list);
  }

  public remove(list: List): void {
    this.listService.removeList(list);
  }

  public addList() {
    const list: List = {
      name: this.newList,
    };
    this.listService.createList(list);
    this.newList = '';
  }
}
