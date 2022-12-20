import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ContentfulService } from 'src/app/shared/services/contentful.service';

import { ContentfulActions } from '../actions';

@Injectable()
export class ContentfulEffects {
  getContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentfulActions.getContentfulContent),
      switchMap(action =>
        from(
          this.contentfulService.getContent(action.entryID, action.contentID)
        ).pipe(
          tap(content => console.log('Content: ', content)),
          map(content =>
            ContentfulActions.getContentfulContentSuccess({
              entryID: action.entryID,
              content: content,
            })
          ),
          catchError(error =>
            of(ContentfulActions.getContentfulContentFailure({ error: error }))
          )
        )
      )
    )
  );

  getAsset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentfulActions.getContentfulAsset),
      switchMap(action =>
        from(this.contentfulService.getAsset(action.assetID)).pipe(
          map(asset =>
            ContentfulActions.getContentfulAssetSuccess({
              assetUrl: asset,
              entryID: action.entryID,
            })
          ),
          catchError(error =>
            of(ContentfulActions.getContentfulAssetFailure({ error: error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contentfulService: ContentfulService
  ) {}
}
