import React from 'react';
import SafeOutput from 'components/SafeOutput';

export default function Project({project}) {
  return (
    <li className="project-tabs__list__project">
      <h2>{project.name}</h2>
      {project.link ? <a href={project.link} className="project-link">Link</a> : ''}
      {project.repo ? <a href={project.repo} className="project-code-link">Code</a> : ''}
      <SafeOutput content={project.description}/>
    </li>
  );
}
