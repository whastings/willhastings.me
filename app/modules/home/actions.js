// @flow

import type { AsyncAction } from 'app/types';
import type { Page, PageAddAction } from 'pages/types';

export function loadHomePage(): AsyncAction {
  return (api, getState): Promise<PageAddAction> | null => {
    if (getState().pages.home) {
      return null;
    }

    return api.getHomePage()
      .then((page: Page) => ({type: 'PAGE_ADD', payload: page}));
  };
}
