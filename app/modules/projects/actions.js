export function loadProjectsPage(api, store) {
  if (store.getState().pages.projects) {
    return null;
  }

  return {
    type: 'PAGE_LOAD',
    payload: {
      promise: api.getProjectsPage()
        .then((page) => ({type: 'PAGE_ADD', payload: page}))
    }
  };
}
