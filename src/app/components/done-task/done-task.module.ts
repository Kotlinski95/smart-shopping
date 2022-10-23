import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { DoneTaskComponent } from './done-task.component';

@NgModule({
  declarations: [DoneTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    TranslateModule,
  ],
  exports: [DoneTaskComponent],
})
export class DoneTaskModule {}
