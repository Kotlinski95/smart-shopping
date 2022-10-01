
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [AddTaskComponent],
})
export class AddTaskModule {}
