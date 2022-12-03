import { googleAuthFailure } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EMPTY,
  from,
  Observable,
  of,
  OperatorFunction,
  throwError,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  exhaustMap,
  flatMap,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {
  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userLogin),
      switchMap(action =>
        from(this.authService.SignIn(action.login, action.password)).pipe(
          map(() => AuthActions.userLoginSuccess()),
          catchError(error =>
            of(AuthActions.userLoginFailure({ error: error }))
          )
        )
      )
    )
  );
  userLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userLogout),
      switchMap(() =>
        from(this.authService.SignOut()).pipe(
          map(() => AuthActions.userLogoutSuccess()),
          catchError(error =>
            of(AuthActions.userLogoutFailure({ error: error }))
          )
        )
      )
    )
  );
  setUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.setUser),
      map(action => {
        this.authService.setUser(action.user);
        return AuthActions.setUserSuccess({
          user: {
            uid: action?.user?.uid || undefined,
            email: action?.user?.email || undefined,
            displayName: action?.user?.displayName || undefined,
            photoURL: action?.user?.photoURL || undefined,
            emailVerified: action?.user?.emailVerified || undefined,
            isAnonymous: action?.user?.isAnonymous || undefined,
          },
        });
      })
    )
  );
  googleAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.googleAuth),
      switchMap(() =>
        from(this.authService.GoogleAuth()).pipe(
          map(() => AuthActions.googleAuthSuccess()),
          catchError(error =>
            of(AuthActions.googleAuthFailure({ error: error }))
          )
        )
      )
    )
  );
  facebookAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.facebookAuth),
      switchMap(() =>
        from(this.authService.FacebookAuth()).pipe(
          map(() => AuthActions.facebookAuthSuccess()),
          catchError(error => {
            return of(AuthActions.facebookAuthFailure({ error: error }));
          })
        )
      )
    )
  );
  anonymousLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.anonymousLogin),
      switchMap(() =>
        from(this.authService.AnonymousLogin()).pipe(
          map(() => AuthActions.anonymousLoginSuccess()),
          catchError(error =>
            of(AuthActions.anonymousLoginFailure({ error: error }))
          )
        )
      )
    )
  );
  userSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.userSignUp),
      switchMap(action =>
        from(this.authService.SignUp(action.email, action.password)).pipe(
          map(() => AuthActions.userSignUpSuccess()),
          catchError(error =>
            of(AuthActions.userSignUpFailure({ error: error }))
          )
        )
      )
    )
  );
  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      switchMap(action => {
        return from(
          this.authService.ForgotPassword(action.passwordResetEmail)
        ).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError(error =>
            of(AuthActions.forgotPasswordFailure({ error: error }))
          )
        );
      })
    )
  );
  sendVerificationMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendVerificationMail),
      switchMap(() => {
        return from(this.authService.SendVerificationMail()).pipe(
          map(() => AuthActions.sendVerificationMailSuccess()),
          catchError(error =>
            of(AuthActions.sendVerificationMailFailure({ error: error }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
