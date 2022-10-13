import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailComponent,
  },
];
@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule.forChild(routes)],
})
export class VerifyEmailModule {}
