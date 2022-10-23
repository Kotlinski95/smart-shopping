import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
  OnDestroy,
  Inject,
} from '@angular/core';
import { MetaService } from './shared/services/meta.service';
import { AuthService } from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { SsrSupportService } from './shared/services/ssr-support.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('flagSelected') selectedFlag!: ElementRef;
  title = 'smart-shopping';
  private selectedLanguage: string =
    this.ssrSupportService.getLocalStorageItem('language') ?? 'pl';
  onLangChange: Subscription = new Subscription();
  constructor(
    private meta: MetaService,
    public authService: AuthService,
    private translate: TranslateService,
    public el: ElementRef,
    private ssrSupportService: SsrSupportService
  ) {
    this.meta.updateMetaData();
    translate.setDefaultLang(this.selectedLanguage);
  }
  useLanguage(language: string): void {
    this.selectedFlag?.nativeElement?.classList.remove(
      `flag-icon-${this.translate.currentLang}`
    );
    const languageMap: { [key: string]: string } = {
      en: 'gb',
      pl: 'pl',
    };
    this.selectedFlag?.nativeElement?.classList.add(
      `flag-icon-${languageMap[language]}`
    );
    this.translate.use(language);
    this.ssrSupportService.setLocalStorageItem('language', language);
  }

  ngAfterViewInit(): void {
    this.useLanguage(this.selectedLanguage);
    this.updateLanguage();
    this.onLangChange = this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
  }

  ngOnDestroy() {
    if (this.onLangChange !== undefined) {
      this.onLangChange.unsubscribe();
    }
  }

  updateLanguage(): void {
    const documentSsr = this.ssrSupportService.getDocument();
    const lang = documentSsr.createAttribute('lang');
    lang.value = this.translate.currentLang;
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(
      lang
    );
  }
}
