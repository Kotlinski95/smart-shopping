import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TasksActions } from 'src/app/state/actions';
import {
  getListsState,
  getListState,
  getLoadedState,
} from 'src/app/state/selectors';
import { List } from 'src/app/shared/interfaces/list';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscripion: Subscription = new Subscription();
  public isTaskListLoaded$: Observable<boolean> = new Observable();
  public list$: Observable<List> = new Observable();
  public lists$: Observable<List[]> = new Observable();
  public selectedList: any;
  constructor(
    private authService: AuthService,
    private tasksService: TaskService,
    private store: Store
  ) {
    this.store.dispatch(TasksActions.setTasks());
    this.list$ = this.store.select(getListState);
    this.lists$ = this.store.select(getListsState);
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.isTaskListLoaded$ = this.store.select(getLoadedState);
  }

  ngOnDestroy(): void {
    this.subscripion.unsubscribe();
  }
}
