import React from 'react';
import ProjectList from '../ProjectList';

export default function projectTabs({categories, currentCategory, onTabClick}) {
  return (
    <div className="project-tabs">
      <ul className="project-tabs__tab-list">
        {categories.map((category, i) => {
          return (
            <li key={category.name}>
              <a href="#" onClick={onTabClick.bind(null, i)}>{category.name}</a>
            </li>
          );
        })}
      </ul>
      <ProjectList projects={currentCategory.projects}/>
    </div>
  );
}
