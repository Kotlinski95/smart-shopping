import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('flagSelected') selectedFlag!: ElementRef;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private elementRef: ElementRef
  ) {}

  public changeLanguage(language: string): void {
    this.languageService.changeLanguage(language, this.selectedFlag);
  }

  ngAfterViewInit(): void {
    this.languageService.useLanguage(
      this.languageService.getSelectedLanguage(),
      this.selectedFlag
    );
    this.languageService.updateLanguage(
      this.elementRef.nativeElement.parentElement.parentElement
    );
    this.subscriptions.add(
      this.translate.onLangChange.subscribe(() => {
        this.languageService.updateLanguage(
          this.elementRef.nativeElement.parentElement.parentElement
        );
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions !== undefined) {
      this.subscriptions.unsubscribe();
    }
  }
}
