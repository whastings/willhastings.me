// @flow

import type { State } from 'app/types';
import type { Page } from './types';

export function getPage(state: State, name: string): Page {
  return state.pages[name];
}
