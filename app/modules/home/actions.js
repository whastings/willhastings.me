export function loadHomePage(api, store) {
  if (store.getState().pages.home) {
    return null;
  }

  return {
    type: 'PAGE_LOAD',
    payload: {
      promise: api.getHomePage()
        .then((page) => ({type: 'PAGE_ADD', payload: page}))
    }
  };
}
