import { Component } from '@angular/core';
import { SsrSupportService } from 'src/app/shared/services/ssr-support.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  public url = this.ssrSupportService.getWindowView()?.location.hostname;
  constructor(private ssrSupportService: SsrSupportService) {}

  public getActualUrl(): string {
    return this.url ? this.url : '';
  }
}
