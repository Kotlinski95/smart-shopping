import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/state/actions';
import { BehaviorSubject } from 'rxjs';
import {
  FormService,
  MyErrorStateMatcher,
} from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  private hidePassword = new BehaviorSubject(true);
  public hidePassword$ = this.hidePassword.asObservable();
  public faUserShield = faUserShield;
  public signUpForm!: FormGroup;
  constructor(private formService: FormService, private store: Store) {}

  public ngOnInit(): void {
    this.signUpForm = this.formService.getSignUpForm();
  }

  public togglePasswordHide(): void {
    this.hidePassword.next(!this.hidePassword.getValue());
  }

  public signUp(): void {
    this.store.dispatch(
      AuthActions.userSignUp({
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      })
    );
  }

  public googleAuth(): void {
    this.store.dispatch(AuthActions.googleAuth());
  }
}
