import { NgModule } from '@angular/core';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';
import { CheckedDirective } from './checked.directive';
import { DateDirective } from './date.directive';

@NgModule({
  declarations: [CheckedDirective, DateDirective, BlockCopyPasteDirective],
  exports: [CheckedDirective, DateDirective, BlockCopyPasteDirective],
})
export class DirectivesModule {}
