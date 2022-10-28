import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [CommonModule, NgbModule],
  exports: [LanguageSelectorComponent],
})
export class LanguageSelectorModule {}
