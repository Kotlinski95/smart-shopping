export interface Consents {
  cookies: boolean;
  privacy: boolean;
}

export interface ConsentsState {
  consents: Consents;
  error: string;
}
