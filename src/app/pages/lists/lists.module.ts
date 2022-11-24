import { NgModule } from '@angular/core';
import { ListsComponent } from './lists.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import * as Reducers from 'src/app/state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as Effects from 'src/app/state/effects';

const routes: Routes = [
  {
    path: '',
    component: ListsComponent,
  },
];

@NgModule({
  declarations: [ListsComponent],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    EffectsModule.forFeature([Effects.ListsEffects, Effects.TasksEffects]),
    StoreModule.forFeature('Shopping-Lists', Reducers.ListsReducer),
  ],
  exports: [ListsComponent],
  providers: [TaskService],
})
export class ListsModule {}
