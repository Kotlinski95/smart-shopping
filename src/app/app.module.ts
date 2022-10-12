import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { FormsModule } from '@angular/forms';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { DoneTaskComponent } from './components/done-task/done-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckedDirective } from './shared/directives/checked.directive';
import { DateDirective } from './shared/directives/date.directive';
import { TransformTaskPipe } from './shared/pipes/transform-task.pipe';
import { SortNamePipe } from './shared/pipes/sort-name.pipe';
import { HttpService } from './shared/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AddTaskModule } from './components/add-task/add-task.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthService } from './shared/services/auth.service';
import { SignInModule } from './components/sign-in/sign-in.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ForgotPassowrdModule } from './components/forgot-passoword/forgot-password.module';
import { SignUpModule } from './components/sign-up/sign-up.module';
import { VerifyEmailModule } from './components/verify-email/verify-email.module';
import { MessageBoxModule } from './components/message-box/message-box.module';

/* Decorator NgModule - information about components, directives and servises in our application */
@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    DateDirective,
    TransformTaskPipe,
    SortNamePipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AddTaskModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SignInModule,
    DashboardModule,
    ForgotPassowrdModule,
    SignUpModule,
    VerifyEmailModule,
    MessageBoxModule,
  ],
  providers: [
    HttpService,
    ScreenTrackingService,
    UserTrackingService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
