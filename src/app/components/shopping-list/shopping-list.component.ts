import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public isTaskListLoaded$: Observable<boolean> = new Observable();
  private subscripion: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private tasksService: TaskService
  ) {
    this.subscripion.add(
      this.tasksService.getTasksListObservableFb().subscribe()
    );
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
