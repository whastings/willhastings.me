// @flow

import type { AsyncAction } from 'app/types';

export function loadHomePage(): AsyncAction {
  return (api, getState) => {
    if (getState().pages.home) {
      return null;
    }

    return api.getHomePage()
      .then((page) => ({type: 'PAGE_ADD', payload: page}));
  };
}
