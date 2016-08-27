import './styles.scss';
import ProjectLink from 'projects/components/ProjectLink';
import React from 'react';
import SafeOutput from 'app/utils/components/SafeOutput';

export default function Project({project}) {
  let projectName = project.name;

  return (
    <article className="project-info">
      <header className="project-info__header">
        <h3 className="project-info__title">{projectName}</h3>
        <div className="project-info__links">
          {project.link && <ProjectLink type="open" href={project.link} projectName={projectName}/>}
          {project.repo && <ProjectLink href={project.repo} projectName={projectName}/>}
        </div>
      </header>
      <SafeOutput content={project.description}/>
    </article>
  );
}
