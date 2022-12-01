import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Termly } from 'src/app/shared/interfaces/consents';
import { SsrSupportService } from 'src/app/shared/services/ssr-support.service';
import { ConsentsActions } from '../actions';

@Injectable()
export class ConsentsEffects {
  setCookies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentsActions.setCookies),
      map(() =>
        ConsentsActions.setCookiesSuccess({
          cookies: true,
        })
      )
    )
  );
  setPrivacy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentsActions.setPrivacy),
      map(() =>
        ConsentsActions.setPrivacySuccess({
          privacy: true,
        })
      )
    )
  );

  setTermly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentsActions.setTermlyState),
      map(() => {
        const windowView = this.ssrSupportService.getWindowView();
        const termly: Termly = {
          cookies: windowView?.termlyCookies,
          termlyResourceBlockerLoaded:
            windowView?.TERMLY_RESOURCE_BLOCKER_LOADED,
          unblockingCookies: windowView?.termlyUnblockingCookies,
          cookiesCategories: windowView?.Termly?.getConsentState(),
        };
        return ConsentsActions.setTermlyStateSuccess({
          termly: termly,
        });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private ssrSupportService: SsrSupportService
  ) {}
}
