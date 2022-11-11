import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { TaskService } from 'src/app/shared/services/task.service';
import { TasksActions } from '../actions';
import { Task } from '../../shared/interfaces/task';
import { Store } from '@ngrx/store';
import { getListState } from '../selectors/lists.selectors';

@Injectable()
export class TasksEffects {
  setTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.setTasks),
      withLatestFrom(this.store.select(getListState)),
      switchMap(([action, list]) => {
        return this.taskService.getTasksListObservableFb(list.name).pipe(
          map((tasks: Task[]) => {
            return TasksActions.setTasksSuccess({ tasks: tasks });
          }),
          catchError((error: string) => {
            return of(TasksActions.setTasksFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) {}
}
