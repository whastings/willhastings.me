import map from 'app/utils';
import Project from './Project';
import React from 'react';

export default function ProjectList({projects}) {
  return (
    <ul className="project-tabs__list">
      {map(projects, (project) => <Project project={project} key={project.key}/>)}
    </ul>
  );
}
