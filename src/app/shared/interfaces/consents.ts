export interface TermlyCategories {
  advertising: boolean;
  analytics: boolean;
  essential: boolean;
  performance: boolean;
  social_networking: boolean;
  unclassified: boolean;
}
export interface Termly {
  termlyResourceBlockerLoaded?: boolean;
  cookies?: unknown;
  unblockingCookies?: unknown;
  cookiesCategories?: TermlyCategories;
}

export interface Consents {
  termly: Termly;
  privacy: boolean;
}

export interface ConsentsState {
  consents: Consents;
  error: string;
}
