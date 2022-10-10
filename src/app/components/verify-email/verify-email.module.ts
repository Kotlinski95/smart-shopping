import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
})
export class VerifyEmailModule {}
