import React from 'react';
import { ProjectsPage } from './components';
import { loadProjectsPage } from './actions';
import { getPage } from 'pages/selectors';

export default {
  index(req, store) {
    return store.dispatch(loadProjectsPage())
      .then(() => {
        const { categories } = getPage(store.getState(), 'projects');
        return <ProjectsPage categories={categories} />;
      });
  }
};
