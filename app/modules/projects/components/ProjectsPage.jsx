import ProjectTabs from './ProjectTabs';
import React from 'react';
import profiler from 'app/utils/components/profiler';

export function ProjectsPage(props) {
  return (
    <section className="projects-page">
      <h2 className="page-title">Projects</h2>

      <ProjectTabs categories={props.categories}/>
    </section>
  );
}

export default profiler(ProjectsPage);
