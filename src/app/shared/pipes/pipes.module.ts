import { NgModule } from '@angular/core';
import { SortNamePipe } from './sort-name.pipe';
import { TransformTaskPipe } from './transform-task.pipe';

@NgModule({
  declarations: [SortNamePipe, TransformTaskPipe],
  exports: [SortNamePipe, TransformTaskPipe],
})
export class PipesModule {}
