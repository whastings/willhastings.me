import Project from './Project';
import React from 'react';

export default function ProjectList({projects}) {
  return (
    <ul className="project-tabs__list">
      {projects.map((project) => <Project project={project} key={project.key}/>)}
    </ul>
  );
}
