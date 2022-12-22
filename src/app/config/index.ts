import { firebaseConfig } from './firebase.config';
import { contentfulConfig } from './contentful.config';
import { Config } from '../shared/interfaces/config';

export const config: Config = {
  firebase: firebaseConfig,
  contentful: contentfulConfig,
};
