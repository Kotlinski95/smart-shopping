import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ListService } from '../services/list.service';
import { Store } from '@ngrx/store';
import { getListState } from 'src/app/state/selectors';
import { List } from '../interfaces/list';
import { SsrSupportService } from '../services/ssr-support.service';

@Injectable({
  providedIn: 'root',
})
export class ListGuard implements CanActivate {
  private initLoadedState = false;
  private isListLoaded: BehaviorSubject<boolean> = new BehaviorSubject(
    this.initLoadedState
  );
  private selectedList$!: Observable<List>;
  constructor(private router: Router, private store: Store) {
    this.selectedList$ = this.store.select(getListState);
    this.selectedList$?.subscribe(list => {
      if (list?.name) this.isListLoaded.next(true);
    });
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isListLoaded.getValue() !== true) {
      this.router.navigate(['lists']);
    }
    return true;
  }
}
