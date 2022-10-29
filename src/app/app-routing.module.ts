import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/shopping-list/shopping-list.module').then(
        m => m.ShoppingListModule
      ),
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
    loadChildren: () =>
      import('./components/sign-in/sign-in.module').then(m => m.SignInModule),
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
    loadChildren: () =>
      import('./components/sign-up/sign-up.module').then(m => m.SignUpModule),
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
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
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

    loadChildren: () =>
      import('./components/forgot-passoword/forgot-password.module').then(
        m => m.ForgotPassowrdModule
      ),
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
    loadChildren: () =>
      import('./components/verify-email/verify-email.module').then(
        m => m.VerifyEmailModule
      ),
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then(m => m.AboutModule),
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./pages/privacy/privacy.module').then(m => m.PrivacyModule),
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
