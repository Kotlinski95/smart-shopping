import { Component } from '@angular/core';
import { MetaService } from './shared/services/meta.service';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'smart-shopping';
  constructor(private meta: MetaService, public authService: AuthService) {
    this.meta.updateMetaData();
  }
}
