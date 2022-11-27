import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'src/app/components/card/card.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    RouterModule.forChild(routes),
    TranslateModule,
    CardModule,
  ],
})
export class DashboardModule {}
