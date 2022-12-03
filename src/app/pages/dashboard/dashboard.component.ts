import { AuthActions } from 'src/app/state/actions';
import { Observable } from 'rxjs/internal/Observable';
import { getListState, getUserState } from 'src/app/state/selectors';
import { List } from 'src/app/shared/interfaces/list';
import { Component } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public faSignOutAlt = faSignOutAlt;
  public selectedList$: Observable<List>;
  public user$ = this.store.select(getUserState);
  constructor(private store: Store) {
    this.selectedList$ = this.store.select(getListState);
  }

  public signOut(): void {
    this.store.dispatch(AuthActions.userLogout());
  }
}
