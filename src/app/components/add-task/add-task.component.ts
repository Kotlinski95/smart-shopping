import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { List } from 'src/app/shared/interfaces/list';
import { TaskService } from 'src/app/shared/services/task.service';
import { TasksActions } from 'src/app/state/actions';
import { getListState } from 'src/app/state/selectors/lists.selectors';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  public newTaskForm!: FormGroup;
  public newTask = '';
  public initList: List = { name: '', tasks: [] };
  public currentList: BehaviorSubject<List> = new BehaviorSubject(
    this.initList
  );
  private subscripion: Subscription = new Subscription();
  constructor(
    private tasksService: TaskService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.subscripion.add(
      this.store.select(getListState)?.subscribe(list => {
        this.currentList.next(list);
      })
    );
  }

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group({
      newTask: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    const task = {
      name: this.newTask,
      created: new Date().toLocaleString(),
      isDone: false,
    };
    this.store.dispatch(TasksActions.addTask({ task: task }));
    this.newTask = '';
  }
}
