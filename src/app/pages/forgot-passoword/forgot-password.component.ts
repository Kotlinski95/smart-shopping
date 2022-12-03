import { AuthActions } from 'src/app/state/actions';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getAuthPendingState } from 'src/app/state/selectors';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public resetPasswordForm!: FormGroup;
  public getAuthPendingState$ = this.store.select(getAuthPendingState);
  constructor(private formBuilder: FormBuilder, public store: Store) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  resetPassword(): void {
    this.store.dispatch(
      AuthActions.forgotPassword({
        passwordResetEmail: this.resetPasswordForm.value.email,
      })
    );
  }
}
