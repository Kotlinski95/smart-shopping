import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-passoword/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'login',
    component: SignInComponent,
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'register',
    component: SignUpComponent,
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
