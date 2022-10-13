import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  title = 'Shopping List';
  isTaskListLoaded$: Observable<boolean> = new Observable();
  subscripion: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private tasksService: TaskService
  ) {
    this.subscripion.add(
      this.tasksService.gettasksListObservableFb().subscribe()
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
