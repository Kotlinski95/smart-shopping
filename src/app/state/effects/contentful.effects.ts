import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ContentfulPage } from 'src/app/shared/interfaces/contentful';
import { ContentfulService } from 'src/app/shared/services/contentful.service';

import { ContentfulActions } from '../actions';
import { getContentfulPages } from '../selectors/contentful.selectors';

@Injectable()
export class ContentfulEffects {
  getContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentfulActions.getContentfulContent),
      withLatestFrom(this.store.select(getContentfulPages)),
      switchMap(([action, pages]) => {
        const existingPage: ContentfulPage | undefined = pages.find(
          (page: ContentfulPage) => page.id.entryID === action.entryID
        );
        if (existingPage && existingPage.id.entryID && existingPage.content) {
          return of(
            ContentfulActions.getContentfulContentSuccess({
              entryID: existingPage.id.entryID,
              content: existingPage.content,
            })
          );
        } else {
          return from(
            this.contentfulService.getContent(action.entryID, action.contentID)
          ).pipe(
            map(content => {
              return ContentfulActions.getContentfulContentSuccess({
                entryID: action.entryID,
                content: content,
              });
            }),
            catchError(error =>
              of(
                ContentfulActions.getContentfulContentFailure({ error: error })
              )
            )
          );
        }
      })
    )
  );

  getAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentfulActions.getContentfulAsset),
      withLatestFrom(this.store.select(getContentfulPages)),
      switchMap(([action, pages]) => {
        const existingPage: ContentfulPage | undefined = pages.find(
          (page: ContentfulPage) => page.id.entryID === action.entryID
        );
        if (
          existingPage &&
          existingPage.id.entryID &&
          existingPage.asset &&
          existingPage.asset.url
        ) {
          return of(
            ContentfulActions.getContentfulAssetSuccess({
              entryID: existingPage.id.entryID,
              assetUrl: existingPage.asset.url,
            })
          );
        } else {
          return from(this.contentfulService.getAsset(action.assetID)).pipe(
            map(asset =>
              ContentfulActions.getContentfulAssetSuccess({
                assetUrl: asset,
                entryID: action.entryID,
              })
            ),
            catchError(error =>
              of(ContentfulActions.getContentfulAssetFailure({ error: error }))
            )
          );
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private contentfulService: ContentfulService,
    private store: Store
  ) {}
}
