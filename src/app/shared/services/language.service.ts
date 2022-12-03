import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ElementRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { SsrSupportService } from './ssr-support.service';
import { AlertType } from '../interfaces/alert';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private languageMapIcon: { [key: string]: string } = {
    en: 'gb',
    pl: 'pl',
  };
  private languageMap: { [key: string]: string } = {
    en: 'english',
    pl: 'polski',
  };
  private translationSection = 'alert.internationalization';
  private initialSelectedFlag: ElementRef = new ElementRef('');
  private languageSelectedFlag: BehaviorSubject<ElementRef> =
    new BehaviorSubject(this.initialSelectedFlag);
  public languageSelectedFlag$ = this.languageSelectedFlag.asObservable();
  constructor(
    private translate: TranslateService,
    private ssrSupportService: SsrSupportService,
    private alertService: AlertService
  ) {
    translate.setDefaultLang(this.getSelectedLanguage());
    this.subscriptions.add(
      this.translate.onLangChange.subscribe(() => {
        this.updateLanguage(
          this.languageSelectedFlag.getValue()?.nativeElement.parentElement
            .parentElement
        );
      })
    );
  }

  public setLanguageFlagElement(flag: ElementRef) {
    this.languageSelectedFlag.next(flag);
  }

  public useLanguage(language: string): Promise<void> {
    return new Promise(resolve => {
      this.languageSelectedFlag
        .getValue()
        ?.nativeElement?.classList.remove(
          `flag-icon-${this.translate.currentLang}`
        );
      this.languageSelectedFlag
        .getValue()
        ?.nativeElement?.classList.add(
          `flag-icon-${this.languageMapIcon[language]}`
        );
      this.translate.use(language);
      this.ssrSupportService.setLocalStorageItem('language', language);
      this.updateLanguage(
        this.languageSelectedFlag.getValue()?.nativeElement.parentElement
          .parentElement
      );
      resolve();
    });
  }

  public updateLanguage(flagParentElement: HTMLElement): void {
    const documentSsr = this.ssrSupportService.getDocument();
    const lang = documentSsr.createAttribute('lang');
    lang.value = this.translate.currentLang;
    flagParentElement.attributes.setNamedItem(lang);
  }

  public changeLanguage(language: string): void {
    this.useLanguage(language).then(() => {
      this.alertService.setAlert({
        type: AlertType.Info,
        message: this.translate.instant(
          `${this.translationSection}.language_change`,
          {
            language: this.languageMap[language],
          }
        ),
        duration: 3000,
      });
    });
  }

  public getSelectedLanguage(): string {
    return this.ssrSupportService.getLocalStorageItem('language') ?? 'pl';
  }

  public ngOnDestroy() {
    if (this.subscriptions !== undefined) {
      this.subscriptions.unsubscribe();
    }
  }
}
