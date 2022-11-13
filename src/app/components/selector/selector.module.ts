import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectorComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [SelectorComponent],
})
export class SelectorModule {}
