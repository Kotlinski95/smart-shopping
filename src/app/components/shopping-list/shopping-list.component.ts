import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { TasksActions } from 'src/app/state/actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscripion: Subscription = new Subscription();
  public isTaskListLoaded$: Observable<boolean> = new Observable();

  constructor(
    private authService: AuthService,
    private tasksService: TaskService,
    private store: Store
  ) {
    this.store.dispatch(TasksActions.setTasks());
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.isTaskListLoaded$ = this.tasksService.isTaskListLoaded();
  }

  ngOnDestroy(): void {
    this.subscripion.unsubscribe();
  }
}
