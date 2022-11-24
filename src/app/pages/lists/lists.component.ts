import { ListsActions } from 'src/app/state/actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { List } from 'src/app/shared/interfaces/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/shared/services/list.service';
import { Store } from '@ngrx/store';
import { getListsState } from 'src/app/state/selectors';

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
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.filterDoneTaskList();
  }

  private filterDoneTaskList(): void {
    this.subscriptions.add(
      this.store.select(getListsState)?.subscribe(lists => {
        this.tasksList = lists;
      })
    );
  }

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group({
      newList: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.store.dispatch(ListsActions.setLists());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public selectList(list: List): void {
    this.listService.setActualSelectedList(list);
  }

  public remove(list: List): void {
    this.store.dispatch(ListsActions.removeList({ list: list }));
  }

  public addList() {
    const list: List = {
      name: this.newList,
    };
    this.store.dispatch(ListsActions.createList({ list: list }));
    this.newList = '';
  }
}
