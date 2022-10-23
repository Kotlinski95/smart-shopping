import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';

@NgModule({
  declarations: [MessageBoxComponent],
  imports: [CommonModule],
  exports: [MessageBoxComponent],
})
export class MessageBoxModule {}
