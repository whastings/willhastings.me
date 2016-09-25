export function loadProjectsPage() {
  return (api, getState) => {
    if (getState().pages.projects) {
      return null;
    }

    return api.getProjectsPage()
      .then((page) => ({type: 'PAGE_ADD', payload: page}));
  };
}
