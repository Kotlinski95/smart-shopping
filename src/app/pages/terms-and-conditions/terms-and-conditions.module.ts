import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContentfulService } from 'src/app/shared/services/contentful.service';
import { LoadingSpinnerModule } from 'src/app/components/loading-spinner/loading-spinner.module';

const routes: Routes = [
  {
    path: '',
    component: TermsAndConditionsComponent,
  },
];

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LoadingSpinnerModule,
  ],
  providers: [ContentfulService],
})
export class TermsAndConditionsModule {}
