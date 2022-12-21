import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as Leaflet from 'leaflet';
import { latLng } from 'leaflet';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ContentfulPage } from 'src/app/shared/interfaces/contentful';
import {
  CONFIG,
  ContentfulService,
} from 'src/app/shared/services/contentful.service';
import { ContentfulActions } from 'src/app/state/actions';
import {
  getContentfulContent,
  getContentfulContentLoaded,
} from 'src/app/state/selectors/contentful.selectors';

export interface Localization {
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  public contentfulConfig = CONFIG.contentTypeIds.about;
  public aboutContent$: Observable<ContentfulPage | undefined> | undefined;
  public aboutImage$: Observable<string> | undefined;
  private leafletOptions: BehaviorSubject<Leaflet.MapOptions> =
    new BehaviorSubject({});
  public leafletOptions$ = this.leafletOptions.asObservable();
  private subscriptions: Subscription = new Subscription();
  public isAboutContentLoaded$: Observable<boolean> = new Observable();
  constructor(
    private contentfulService: ContentfulService,
    private store: Store
  ) {}
  public ngOnInit(): void {
    this.store.dispatch(
      ContentfulActions.getContentfulContent({
        entryID: this.contentfulConfig.entryID,
        contentID: this.contentfulConfig.contentID,
      })
    );
    this.store.dispatch(
      ContentfulActions.getContentfulAsset({
        entryID: this.contentfulConfig.entryID,
        assetID: this.contentfulConfig.assetID,
      })
    );
    this.aboutContent$ = this.store.pipe(
      select(state =>
        getContentfulContent(state, this.contentfulConfig.entryID)
      )
    );
    this.isAboutContentLoaded$ = this.store.pipe(
      select(state =>
        getContentfulContentLoaded(state, this.contentfulConfig.entryID)
      )
    );
    this.subscriptions.add(
      this.aboutContent$.subscribe(data => {
        if (data?.content) {
          this.leafletOptions.next({
            ...this.leafletOptions.getValue(),
            layers: this.getLayer(
              data.content.fields.localization,
              data.content.fields.localizationHeader
            ),
            zoom: 13,
            center: latLng(
              data.content.fields.localization.lat,
              data.content.fields.localization.lon
            ),
          });
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
