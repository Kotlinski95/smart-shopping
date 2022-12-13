import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import * as Leaflet from 'leaflet';
import { latLng } from 'leaflet';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  CONFIG,
  ContentfulService,
} from 'src/app/shared/services/contentful.service';

export interface Localization {
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public contentfulConfig = CONFIG.contentTypeIds.about;
  public aboutContent$: Observable<Entry<any>> | undefined;
  public aboutImage$: Observable<string> | undefined;
  private leafletOptions: BehaviorSubject<Leaflet.MapOptions> =
    new BehaviorSubject({});
  public leafletOptions$ = this.leafletOptions.asObservable();
  constructor(private contentfulService: ContentfulService) {}
  public ngOnInit(): void {
    this.aboutContent$ = this.contentfulService.getContent(
      this.contentfulConfig.entryID,
      this.contentfulConfig.contentID
    );
    this.aboutImage$ = this.contentfulService.getAsset(
      this.contentfulConfig.assetID
    );
    this.aboutContent$.subscribe(data => {
      this.leafletOptions.next({
        ...this.leafletOptions.getValue(),
        layers: this.getLayer(
          data.fields.localization,
          data.fields.localizationHeader
        ),
        zoom: 13,
        center: latLng(
          data.fields.localization.lat,
          data.fields.localization.lon
        ),
      });
    });
  }

  public returnHtmlFromRichText(richText: any) {
    return this.contentfulService.returnHtmlFromRichText(richText);
  }

  public getLayer = (
    localization: Localization,
    place: string
  ): Leaflet.Layer[] => {
    return [
      new Leaflet.TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
        } as Leaflet.TileLayerOptions
      ),
      ...this.getMarker(localization, place),
    ] as Leaflet.Layer[];
  };

  public getMarker = (
    localization: Localization,
    place: string
  ): Leaflet.Marker[] => {
    return [
      new Leaflet.Marker(
        new Leaflet.LatLng(localization.lat, localization.lon),
        {
          icon: new Leaflet.Icon({
            iconSize: [50, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/svg/blue-marker.svg',
          }),
          title: place,
        } as Leaflet.MarkerOptions
      ),
    ] as Leaflet.Marker[];
  };
}
