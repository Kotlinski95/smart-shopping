import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContentfulService } from 'src/app/shared/services/contentful.service';

const routes: Routes = [
  {
    path: '',
    component: TermsAndConditionsComponent,
  },
];

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
  providers: [ContentfulService],
})
export class TermsAndConditionsModule {}
