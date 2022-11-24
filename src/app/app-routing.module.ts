import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { ListGuard } from './shared/guard/list.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/shopping-list/shopping-list.module').then(
        m => m.ShoppingListModule
      ),
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
    canActivate: [ListGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/sign-in/sign-in.module').then(m => m.SignInModule),
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
      import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule),
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
      import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
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
      import('./pages/forgot-passoword/forgot-password.module').then(
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
      import('./pages/verify-email/verify-email.module').then(
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
  {
    path: 'terms-and-conditions',
    loadChildren: () =>
      import('./pages/terms-and-conditions/terms-and-conditions.module').then(
        m => m.TermsAndConditionsModule
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
    path: 'cookies',
    loadChildren: () =>
      import('./pages/cookies/cookies.module').then(m => m.CookiesModule),
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then(m => m.ContactModule),
    data: {
      title: 'Smart Shopping',
      description: 'Smart Shopping for everyone',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: 'lists',
    loadChildren: () =>
      import('./pages/lists/lists.module').then(m => m.ListsModule),
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
