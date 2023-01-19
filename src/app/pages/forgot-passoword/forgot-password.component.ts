import { AuthActions } from 'src/app/state/actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getAuthPendingState } from 'src/app/state/selectors';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public getAuthPendingState$ = this.store.select(getAuthPendingState);
  public passwordRecoverForm!: FormGroup;
  constructor(private formService: FormService, public store: Store) {}

  public ngOnInit(): void {
    this.passwordRecoverForm = this.formService.getPasswordRecoverForm();
  }

  public resetPassword(): void {
    this.store.dispatch(
      AuthActions.forgotPassword({
        passwordResetEmail: this.passwordRecoverForm.value.email,
      })
    );
  }
}
