export interface User {
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  emailVerified?: boolean;
  isAnonymous?: boolean;
}

export interface AuthState {
  loggedIn: boolean;
  user?: User;
  error: string;
  pending: boolean;
}
