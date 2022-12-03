import { Component } from '@angular/core';
import { MetaService } from './shared/services/meta.service';
import { AuthService } from './shared/services/auth.service';
import { Store } from '@ngrx/store';
import { ConsentsActions } from './state/actions';
import { getLoginState } from './state/selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'smart-shopping';
  public isLoggedIn$ = this.store.select(getLoginState);
  constructor(private meta: MetaService, private store: Store) {
    this.meta.updateMetaData();
    this.store.dispatch(ConsentsActions.setTermlyState());
  }
}
