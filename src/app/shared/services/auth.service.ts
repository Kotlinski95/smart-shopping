import { Injectable, NgZone } from '@angular/core';
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
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  private translationSection = 'alert.authorization';
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public ssrSupportService: SsrSupportService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.ssrSupportService.setLocalStorageItem(
          'user',
          JSON.stringify(this.userData)
        );
        JSON.parse(this.ssrSupportService.getLocalStorageItem('user')!);
      } else {
        this.ssrSupportService.setLocalStorageItem('user', 'null');
        JSON.parse(this.ssrSupportService.getLocalStorageItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
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
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
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
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.alertService.setAlert({
          type: AlertType.Success,
          message: this.translate.instant(
            `${this.translationSection}.reset_password_success`
          ),
          duration: 3000,
        });
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

  AuthLogin(provider: any) {
    return this.afAuth
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
      });
  }

  AnonymousLogin() {
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

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.ssrSupportService.removeLocalStorageItem('user');
      this.router.navigate(['login']);
      this.alertService.setAlert({
        type: AlertType.Success,
        message: this.translate.instant(
          `${this.translationSection}.logout_success`
        ),
        duration: 3000,
      });
    });
  }
}
