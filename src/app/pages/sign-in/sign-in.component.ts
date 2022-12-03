import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/state/actions';
import { getAuthPendingState } from 'src/app/state/selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  faUserShield = faUserShield;
  public signInForm!: FormGroup;
  public getAuthPendingState$ = this.store.select(getAuthPendingState);
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public signIn(): void {
    this.store.dispatch(
      AuthActions.userLogin({
        login: this.signInForm.value.login,
        password: this.signInForm.value.password,
      })
    );
  }

  public googleAuth(): void {
    this.store.dispatch(AuthActions.googleAuth());
  }

  public facebookAuth(): void {
    this.store.dispatch(AuthActions.facebookAuth());
  }

  public anonymousLogin(): void {
    this.store.dispatch(AuthActions.anonymousLogin());
  }
}
