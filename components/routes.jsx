import HomePage from './home/HomePage';
import ProjectsPage from './projects/ProjectsPage';
import React from 'react';
import { DefaultRoute, Route } from 'react-router';

export default (
  <Route path="/">
    <DefaultRoute handler={HomePage}/>
    <Route name="projects" handler={ProjectsPage}/>
  </Route>
)
