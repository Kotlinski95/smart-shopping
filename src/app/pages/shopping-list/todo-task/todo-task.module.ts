import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TodoTaskComponent } from './todo-task.component';

@NgModule({
  declarations: [TodoTaskComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    DirectivesModule,
    TranslateModule,
  ],
  exports: [TodoTaskComponent],
})
export class ToDoTaskModule {}
