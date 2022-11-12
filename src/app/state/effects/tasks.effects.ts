import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  take,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
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
          take(1),
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

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      tap(action => {
        this.taskService.add(action.task);
      }),
      map(() => {
        return TasksActions.addTaskSuccess();
      }),
      catchError((error: string) => {
        return of(TasksActions.setTasksFailure({ error }));
      })
    )
  );

  removeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.removeTask),
      tap(action => {
        this.taskService.remove(action.task);
      }),
      map(() => {
        return TasksActions.removeTaskSuccess();
      }),
      catchError((error: string) => {
        return of(TasksActions.removeTaskFailure({ error }));
      })
    )
  );

  doneTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.doneTask),
      tap(action => {
        this.taskService.done(action.task);
      }),
      map(() => {
        return TasksActions.doneTaskSuccess();
      }),
      catchError((error: string) => {
        return of(TasksActions.doneTaskFailure({ error }));
      })
    )
  );

  undoTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.undoTask),
      tap(action => {
        this.taskService.undo(action.task);
      }),
      map(() => {
        return TasksActions.undoTaskSuccess();
      }),
      catchError((error: string) => {
        return of(TasksActions.undoTaskFailure({ error }));
      })
    )
  );

  addAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addAllTasks),
      tap(action => {
        this.taskService.addAllTasksPromise(action.list);
      }),
      map(() => {
        return TasksActions.addAllTasksSuccess();
      }),
      catchError((error: string) => {
        return of(TasksActions.addAllTasksFailure({ error }));
      })
    )
  );

  removeAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.removeAllTasks),
      tap(action => {
        this.taskService.clearTasksPromise(action.list);
      }),
      map(() => {
        return TasksActions.removeAllTasksSuccess();
      }),
      catchError((error: string) => {
        return of(TasksActions.removeAllTasksFailure({ error }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) {}
}
