import { AuthActions } from 'src/app/state/actions';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { getUserState } from 'src/app/state/selectors';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  faRedoAlt = faRedoAlt;
  public user$ = this.store.select(getUserState);
  constructor(private store: Store) {}

  public sendVerificationMail(): void {
    this.store.dispatch(AuthActions.sendVerificationMail());
  }
}
