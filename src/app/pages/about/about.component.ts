import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import {
  CONFIG,
  ContentfulService,
} from 'src/app/shared/services/contentful.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public contentfulConfig = CONFIG.contentTypeIds.about;
  public aboutContent$: Observable<Entry<any>> | undefined;
  public aboutImage$: Observable<string> | undefined;
  constructor(private contentfulService: ContentfulService) {}
  public ngOnInit(): void {
    this.aboutContent$ = this.contentfulService.getContent(
      this.contentfulConfig.entryID,
      this.contentfulConfig.contentID
    );
    this.aboutImage$ = this.contentfulService.getAsset(
      this.contentfulConfig.assetID
    );
  }
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 50.28455,
    lng: 19.01519,
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }
}
