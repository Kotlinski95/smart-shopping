import { ElementRef, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { SsrSupportService } from './ssr-support.service';
import { AlertType } from '../interfaces/alert';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageMapIcon: { [key: string]: string } = {
    en: 'gb',
    pl: 'pl',
  };
  private languageMap: { [key: string]: string } = {
    en: 'english',
    pl: 'polski',
  };
  private translationSection = 'alert.internationalization';
  constructor(
    private translate: TranslateService,
    private ssrSupportService: SsrSupportService,
    private alertService: AlertService
  ) {
    translate.setDefaultLang(this.getSelectedLanguage());
  }

  public useLanguage(
    language: string,
    selectedFlag: ElementRef
  ): Promise<void> {
    return new Promise(resolve => {
      selectedFlag?.nativeElement?.classList.remove(
        `flag-icon-${this.translate.currentLang}`
      );
      selectedFlag?.nativeElement?.classList.add(
        `flag-icon-${this.languageMapIcon[language]}`
      );
      this.translate.use(language);
      this.ssrSupportService.setLocalStorageItem('language', language);
      resolve();
    });
  }

  public updateLanguage(flagParentElement: HTMLElement): void {
    const documentSsr = this.ssrSupportService.getDocument();
    const lang = documentSsr.createAttribute('lang');
    lang.value = this.translate.currentLang;
    flagParentElement.attributes.setNamedItem(lang);
  }

  public changeLanguage(language: string, selectedFlag: ElementRef): void {
    this.useLanguage(language, selectedFlag).then(() => {
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
}
