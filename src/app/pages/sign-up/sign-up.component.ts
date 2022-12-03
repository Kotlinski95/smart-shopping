import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/state/actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  faUserShield = faUserShield;
  public signUpForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  signUp(): void {
    this.store.dispatch(
      AuthActions.userSignUp({
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      })
    );
  }

  googleAuth(): void {
    this.store.dispatch(AuthActions.googleAuth());
  }
}
