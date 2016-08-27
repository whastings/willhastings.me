import ProjectInfo from 'projects/components/ProjectInfo';
import React from 'react';
import { map } from 'app/utils';

export default function ProjectList({projects}) {
  return (
    <div className="project-tabs__list">
      {map(projects, (project) => <ProjectInfo project={project} key={project.key}/>)}
    </div>
  );
}
