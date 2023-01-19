import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [CommonModule, NgbModule, TranslateModule],
  exports: [LanguageSelectorComponent],
})
export class LanguageSelectorModule {}
