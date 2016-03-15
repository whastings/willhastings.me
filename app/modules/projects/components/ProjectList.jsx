import Project from './Project';
import React from 'react';
import { map } from 'app/utils';

export default function ProjectList({projects}) {
  return (
    <ul className="project-tabs__list">
      {map(projects, (project) => <Project project={project} key={project.key}/>)}
    </ul>
  );
}
