import { NgModule } from '@angular/core';
import { ListsComponent } from './lists.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';

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
  ],
  exports: [ListsComponent],
  providers: [TaskService],
})
export class ListsModule {}
