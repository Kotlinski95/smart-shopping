import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { List } from 'src/app/shared/interfaces/list';
import { ListService } from 'src/app/shared/services/list.service';
import { TasksActions } from 'src/app/state/actions';
import { getListState } from 'src/app/state/selectors';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {
  @Input() lists!: List[];
  public list$: Observable<List> = new Observable();
  public selectedList!: List;
  public newListForm!: FormGroup;
  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private listService: ListService
  ) {
    this.list$ = this.store.select(getListState);
    this.list$.subscribe(list => {
      this.selectedList = list;
    });
  }

  public onChange(event: Event) {
    const listName = (event.target as HTMLInputElement).value;
    const newList = this.lists.find(list => list.name === listName);
    if (newList) this.selectList(newList);
  }

  public selectList(list: List): void {
    this.listService.setActualSelectedList(list);
    this.store.dispatch(TasksActions.setTasks());
  }

  public ngOnInit(): void {
    this.newListForm = this.formBuilder.group({
      newList: ['', [Validators.required]],
    });
  }
}
