import { Observable } from 'rxjs/internal/Observable';
import { getListState } from 'src/app/state/selectors';
import { List } from 'src/app/shared/interfaces/list';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  faSignOutAlt = faSignOutAlt;
  selectedList$: Observable<List>;
  constructor(public authService: AuthService, private store: Store) {
    this.selectedList$ = this.store.select(getListState);
  }
}
