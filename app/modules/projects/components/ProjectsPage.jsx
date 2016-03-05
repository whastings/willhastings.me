import ProjectTabs from './ProjectTabs';
import React from 'react';

export default function ProjectsPage(props) {
  return (
    <section className="projects-page">
      <h1>Projects</h1>

      <ProjectTabs categories={props.categories}/>
    </section>
  );
}
