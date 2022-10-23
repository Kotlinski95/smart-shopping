import { NgModule } from '@angular/core';
import { CheckedDirective } from './checked.directive';
import { DateDirective } from './date.directive';

@NgModule({
  declarations: [CheckedDirective, DateDirective],
  exports: [CheckedDirective, DateDirective],
})
export class DirectivesModule {}
