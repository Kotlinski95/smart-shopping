import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesComponent } from './cookies.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CookiesComponent,
  },
];

@NgModule({
  declarations: [CookiesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
})
export class CookiesModule {}
