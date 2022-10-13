import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { DoneTaskComponent } from './done-task.component';

@NgModule({
  declarations: [DoneTaskComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DirectivesModule],
  exports: [DoneTaskComponent],
})
export class DoneTaskModule {}
