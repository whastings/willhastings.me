import React from 'react';

export default function Project({project}) {
  return (
    <li className="project-tabs__list__project">
      <h2>{project.name}</h2>
    </li>
  );
}
