export function loadPage(api, store, dispatchAction, page) {
  if (store.getState().pages[page]) {
    return null;
  }

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
