import { Component } from '@angular/core';
import { MetaService } from './shared/services/meta.service';
import { AuthService } from './shared/services/auth.service';
import { Store } from '@ngrx/store';
import { ConsentsActions } from './state/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'smart-shopping';
  constructor(
    private meta: MetaService,
    public authService: AuthService,
    private store: Store
  ) {
    this.meta.updateMetaData();
    this.store.dispatch(ConsentsActions.setTermlyState());
  }
}
