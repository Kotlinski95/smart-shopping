import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { AddTaskModule } from '../add-task/add-task.module';
import { MessageBoxModule } from '../message-box/message-box.module';
import { ToDoTaskModule } from '../todo-task/todo-task.module';
import { DoneTaskModule } from '../done-task/done-task.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  },
];
@NgModule({
  declarations: [ShoppingListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    AddTaskModule,
    MessageBoxModule,
    ToDoTaskModule,
    DoneTaskModule,
    LoadingSpinnerModule,
    TranslateModule,
  ],
  exports: [ShoppingListComponent],
})
export class ShoppingListModule {}
