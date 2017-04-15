// @flow

import { getJSON } from 'app/utils/request';
import type { HomePage } from './types';

export default {
  getHomePage(): Promise<HomePage> {
    return getJSON('/api/pages/home');
  }
};
