import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContentfulService } from 'src/app/shared/services/contentful.service';

const routes: Routes = [
  {
    path: '',
    component: PrivacyComponent,
  },
];

@NgModule({
  declarations: [PrivacyComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
  providers: [ContentfulService],
})
export class PrivacyModule {}
