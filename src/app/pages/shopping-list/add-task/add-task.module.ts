import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddTaskComponent } from './add-task.component';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  exports: [AddTaskComponent],
})
export class AddTaskModule {}
