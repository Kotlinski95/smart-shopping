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
      title: 'Login',
      description: 'Smart Shopping: Login page',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr,login,firebase,authorization',
    },
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule),
    data: {
      title: 'Register',
      description: 'Smart Shopping: Register page',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords:
        'smart,shopping,list,app,pwa,ssr,register,firebase,authorization',
    },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: 'Dashboard',
      description: 'Smart Shopping: Dashboard page',
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
      title: 'Forgot Password',
      description: 'Smart Shopping: Forgot password page',
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
      title: 'Verify Email',
      description: 'Smart Shopping: Verification page',
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
      title: 'About Smart Shopping',
      description: 'Smart Shopping: About us',
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
      title: 'Privacy Policy',
      description: 'Smart Shopping: Privacy policy page',
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
      title: 'Terms&Conditions',
      description: 'Smart Shopping: Terms and conditions page',
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
      title: 'Cookies',
      description: 'Smart Shopping: Cookies policy page',
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
      title: 'Contact',
      description: 'Smart Shopping: Contact us page',
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
      title: 'Lists',
      description: 'Smart Shopping: Lists page',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr',
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
    data: {
      title: 'Not Found',
      description: 'Smart Shopping page not found',
      ogUrl: 'your og url',
      author: 'Adrian Kotlinski',
      keywords: 'smart,shopping,list,app,pwa,ssr,404,error,not-found',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 0],
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
