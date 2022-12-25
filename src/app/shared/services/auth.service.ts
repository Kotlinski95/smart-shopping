import { AuthActions, ListsActions } from 'src/app/state/actions';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { User } from '../interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FacebookAuthProvider } from 'firebase/auth';
import { SsrSupportService } from './ssr-support.service';
import { AlertService } from './alert.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertType } from '../interfaces/alert';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  userData: any; // Save logged in user data
  private translationSection = 'alert.authorization';
  private subscriptions: Subscription = new Subscription();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ssrSupportService: SsrSupportService,
    private alertService: AlertService,
    private translate: TranslateService,
    private store: Store,
    private gaService: GoogleAnalyticsService
  ) {
    this.subscriptions.add(
      this.afAuth.authState.subscribe(user => {
        this.store.dispatch(AuthActions.setUser({ user: Object.freeze(user) }));
      })
    );
  }
  // Sign in with email/password
  SignIn(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          this.SetUserData(result.user);
          this.afAuth.authState.subscribe(user => {
            if (user) {
              this.router.navigate(['dashboard']);
            }
          });
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.login_success`
            ),
            duration: 3000,
          });
          resolve();
          this.gaService.event('sign_ig', 'authorization', 'SignIn');
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.login_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }

  SignUp(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.register_success`
            ),
            duration: 3000,
          });
          this.store.dispatch(ListsActions.cleanSelectedList());
          this.gaService.event('sign_up', 'authorization', 'SignUp');
          resolve();
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.register_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${this.translationSection}.verification_email_success`
          ),
          duration: 3000,
        });
        this.gaService.event(
          'send_verification',
          'authorization',
          'SendVerification'
        );
      })
      .catch(error => {
        this.alertService.setAlert({
          type: AlertType.Error,
          message: this.translate.instant(
            `${this.translationSection}.verification_email_failure`,
            { errorMessage: error.message }
          ),
          duration: 4000,
        });
      });
  }

  ForgotPassword(passwordResetEmail: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.reset_password_success`
            ),
            duration: 3000,
          });
          this.gaService.event(
            'forgot_password',
            'authorization',
            'ForgotPassword'
          );
          resolve();
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.reset_password_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(
      this.ssrSupportService.getLocalStorageItem('user')!
    );
    return (
      user !== null &&
      (user.emailVerified !== false ? true : false || user.isAnonymous)
    );
  }

  get actualUser(): User {
    const user = JSON.parse(
      this.ssrSupportService.getLocalStorageItem('user')!
    );
    return user;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  AuthLogin(provider: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithPopup(provider)
        .then(result => {
          this.SetUserData(result.user);
          this.afAuth.authState.subscribe(user => {
            if (user) {
              this.router.navigate(['dashboard']);
              this.alertService.setAlert({
                type: AlertType.Success,
                message: this.translate.instant(
                  `${this.translationSection}.auth_login_success`
                ),
                duration: 3000,
              });
            }
          });
          this.store.dispatch(ListsActions.cleanSelectedList());
          this.gaService.event('sign_auth', 'authorization', 'AuthLogin');
          resolve();
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.auth_login_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }

  AnonymousLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInAnonymously()
        .then(result => {
          this.SetUserData(result.user);
          this.afAuth.authState.subscribe(user => {
            if (user) {
              this.router.navigate(['dashboard']);
              this.alertService.setAlert({
                type: AlertType.Success,
                message: this.translate.instant(
                  `${this.translationSection}.anonymous_login_success`
                ),
                duration: 3000,
              });
            }
          });
          this.store.dispatch(ListsActions.cleanSelectedList());
          this.gaService.event(
            'sign_anonymous',
            'authorization',
            'AnonymousLogin'
          );
          resolve();
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.anonymous_login_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  GetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.get().pipe(map(data => data.data()));
  }

  SignOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.afAuth
        .signOut()
        .then(() => {
          this.ssrSupportService.removeLocalStorageItem('user');
          this.router.navigate(['login']);
          this.alertService.setAlert({
            type: AlertType.Success,
            message: this.translate.instant(
              `${this.translationSection}.logout_success`
            ),
            duration: 3000,
          });
          this.store.dispatch(ListsActions.cleanSelectedList());
          this.gaService.event('sign_out', 'authorization', 'SignOut');
          resolve();
        })
        .catch(error => {
          this.alertService.setAlert({
            type: AlertType.Error,
            message: this.translate.instant(
              `${this.translationSection}.logout_failure`,
              { errorMessage: error.message }
            ),
            duration: 4000,
          });
          reject(error);
        });
    });
  }

  public setUser(user: firebase.User | null): void {
    if (user) {
      this.userData = user;
      this.ssrSupportService.setLocalStorageItem('user', JSON.stringify(user));
      JSON.parse(this.ssrSupportService.getLocalStorageItem('user')!);
    } else {
      this.ssrSupportService.setLocalStorageItem('user', 'null');
      JSON.parse(this.ssrSupportService.getLocalStorageItem('user')!);
    }
  }
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
