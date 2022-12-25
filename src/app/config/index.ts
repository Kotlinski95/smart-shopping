import { Config } from '../shared/interfaces/config';
import { firebaseConfig } from './firebase.config';
import { contentfulConfig } from './contentful.config';
import { googleAnalytics } from './analytics';

export const config: Config = {
  firebase: firebaseConfig,
  contentful: contentfulConfig,
  googleAnalytics: googleAnalytics,
};
