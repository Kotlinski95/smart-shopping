import { GoogleAnalytics } from './analytics';
import { ContentfulConfig } from './contentful';
import { FirebaseConfig } from './firebase';

export interface Config {
  firebase: FirebaseConfig;
  contentful: ContentfulConfig;
  googleAnalytics: GoogleAnalytics;
}
