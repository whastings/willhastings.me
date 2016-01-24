export function loadPage(api, store, dispatchAction, page) {
  // TODO: Check if page already in store.

  return {
    type: 'PAGE_LOAD',
    payload: {
      promise: api.getPage(page)
        .then((pageData) => {
          pageData.id = page;
          return {type: 'PAGE_ADD', payload: pageData};
        })
    }
  };
}
