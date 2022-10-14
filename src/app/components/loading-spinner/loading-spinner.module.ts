import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule, TranslateModule],
  exports: [LoadingSpinnerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoadingSpinnerModule {}
