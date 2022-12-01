import { TermlyCategories } from 'src/app/shared/interfaces/consents';

declare global {
  interface Window {
    user_uuid: string;
    Termly: { getConsentState: () => TermlyCategories };
    termlyCookies: unknown;
    termlyUnblockingCookies: unknown;
    TERMLY_RESOURCE_BLOCKER_LOADED: boolean;
  }
}
