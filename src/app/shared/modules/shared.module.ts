import { TaskService } from 'src/app/shared/services/task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [TaskService],
    };
  }
}
