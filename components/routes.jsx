import HomePage from './home/HomePage';
import ProjectsPage from './projects/ProjectsPage';
import React from 'react';
import { DefaultRoute, Route, Router } from 'react-router';

export default (
  <Router>
    <Route path="/">
      <DefaultRoute handler={HomePage}/>
      <Route path="projects" component={ProjectsPage}/>
    </Route>
  </Router>
)
