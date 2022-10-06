import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

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
