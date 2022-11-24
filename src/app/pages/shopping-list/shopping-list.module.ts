import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { AddTaskModule } from './add-task/add-task.module';
import { MessageBoxModule } from '../../components/message-box/message-box.module';
import { ToDoTaskModule } from './todo-task/todo-task.module';
import { LoadingSpinnerModule } from '../../components/loading-spinner/loading-spinner.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SelectorModule } from '../../components/selector/selector.module';
import * as Effects from 'src/app/state/effects';
import * as Reducers from 'src/app/state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DoneTaskModule } from './done-task/done-task.module';

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
    SharedModule,
    SelectorModule,
    EffectsModule.forFeature([Effects.ListsEffects, Effects.TasksEffects]),
    StoreModule.forFeature('Shopping-Lists', Reducers.ListsReducer),
  ],
  exports: [ShoppingListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShoppingListModule {}
