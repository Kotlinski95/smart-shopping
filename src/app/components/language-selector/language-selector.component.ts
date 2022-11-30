import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LanguageActions } from 'src/app/state/actions';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements AfterViewInit {
  @ViewChild('flagSelected') selectedFlag!: ElementRef;
  constructor(private languageService: LanguageService, private store: Store) {}

  public changeLanguage(language: string): void {
    this.store.dispatch(
      LanguageActions.setLanguage({
        language: language,
      })
    );
  }

  ngAfterViewInit(): void {
    this.languageService.setLanguageFlagElement(this.selectedFlag);
    this.store.dispatch(
      LanguageActions.useLanguage({
        language: this.languageService.getSelectedLanguage(),
      })
    );
  }
}
