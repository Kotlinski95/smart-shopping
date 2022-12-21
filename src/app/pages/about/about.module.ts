import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContentfulService } from 'src/app/shared/services/contentful.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LoadingSpinnerModule } from 'src/app/components/loading-spinner/loading-spinner.module';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LeafletModule,
    LoadingSpinnerModule,
  ],
  providers: [ContentfulService],
})
export class AboutModule {}
