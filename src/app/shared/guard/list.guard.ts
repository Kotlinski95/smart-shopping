import { ListsActions } from 'src/app/state/actions';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getListsState, getListState } from 'src/app/state/selectors';
import { List } from '../interfaces/list';
import { SsrSupportService } from '../services/ssr-support.service';

@Injectable({
  providedIn: 'root',
})
export class ListGuard implements CanActivate {
  private initLoadedState: boolean | undefined = undefined;
  private isListLoaded: BehaviorSubject<boolean | undefined> =
    new BehaviorSubject(this.initLoadedState);
  private selectedList$!: Observable<List>;
  public lists$: Observable<List[]> = new Observable();
  constructor(
    private router: Router,
    private store: Store,
    private ssrSupportService: SsrSupportService
  ) {
    this.lists$ = this.store.select(getListsState);
    this.selectedList$ = this.store.select(getListState);

    combineLatest(this.lists$, this.selectedList$).subscribe(
      ([lists, selectedList]) => {
        if (lists?.length > 0 && selectedList.name !== '') {
          if (lists.find(list => list.name === selectedList.name)) {
            this.isListLoaded.next(true);
          } else {
            this.isListLoaded.next(false);
          }
        }
      }
    );
    if (!this.isListLoaded.getValue()) {
      this.store.dispatch(ListsActions.setLists());
      const list = this.ssrSupportService.getLocalStorageItem('list');
      if (list) {
        this.store.dispatch(
          ListsActions.setList({ list: JSON.parse(list ? list : '') })
        );
      }
    }
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.isListLoaded.getValue() === false) {
    //   this.router.navigate(['lists']);
    // }
    combineLatest(this.lists$, this.selectedList$).subscribe(
      ([lists, selectedList]) => {
        if (lists?.length > 0) {
          if (lists.find(list => list.name === selectedList.name)) {
            this.isListLoaded.next(true);
          } else {
            this.isListLoaded.next(false);
          }
        }
        if (this.isListLoaded.getValue() === false) {
          this.router.navigate(['lists']);
        }
      }
    );
    return true;
  }
}
