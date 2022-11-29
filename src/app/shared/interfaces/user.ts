export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface AuthState {
  loggedIn: boolean;
  user?: User;
  error: string;
}
