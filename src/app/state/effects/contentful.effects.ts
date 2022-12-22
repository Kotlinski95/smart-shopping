import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { config } from 'src/app/config';
import { ContentfulPage } from 'src/app/shared/interfaces/contentful';
import { ContentfulService } from 'src/app/shared/services/contentful.service';

import { ContentfulActions } from '../actions';
import { getContentfulPages } from '../selectors/contentful.selectors';
import { getLanguage } from '../selectors/language.selectors';

@Injectable()
export class ContentfulEffects {
  getContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentfulActions.getContentfulContent),
      withLatestFrom(this.store.select(getLanguage)),
      switchMap(([action, language]) => {
        return from(
          this.contentfulService.getContent(
            action.entryID,
            action.contentID,
            this.contentfulService.getLocaleMapingName(language)
          )
        ).pipe(
          map(content => {
            return ContentfulActions.getContentfulContentSuccess({
              entryID: action.entryID,
              content: content,
            });
          }),
          catchError(error =>
            of(ContentfulActions.getContentfulContentFailure({ error: error }))
          )
        );
      })
    )
  );

  getAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentfulActions.getContentfulAsset),
      withLatestFrom(this.store.select(getLanguage)),
      switchMap(([action, language]) => {
        return from(
          this.contentfulService.getAsset(
            action.assetID,
            this.contentfulService.getLocaleMapingName(language)
          )
        ).pipe(
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
      })
    )
  );

  constructor(
    private actions$: Actions,
    private contentfulService: ContentfulService,
    private store: Store
  ) {}
}
