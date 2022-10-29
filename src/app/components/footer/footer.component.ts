import { Component } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation,
} from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public actualYeat = new Date().getFullYear();
  public hostName: string = this.platformLocation.hostname;
  constructor(private platformLocation: PlatformLocation) {}
}
