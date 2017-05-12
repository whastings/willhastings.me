import React from 'react';

const SHOULD_PROFILE = process.env.SHOULD_PROFILE && (typeof window !== 'undefined');
const performance = SHOULD_PROFILE && window.performance;

export default function profiler(Component) {
  const componentName = Component.displayName || Component.name;

  const ProfilerComponent = class ProfilerComponent extends React.Component {
    constructor(props) {
      super(props);
      if (SHOULD_PROFILE) {
        this.startTime = performance.now();
      }
    }

    componentDidMount() {
      if (SHOULD_PROFILE) {
        this.endTime = performance.now();
        logTimings(componentName, this.startTime, this.endTime);
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };

  ProfilerComponent.displayName = `profiler(${componentName})`;

  return ProfilerComponent;
}

function logTimings(componentName, startTime, endTime) {
  const message = `
Timings for ${componentName}:
Initial render start = ${startTime}ms
Initial render end = ${endTime}ms
Initial render duration = ${endTime - startTime}ms
  `;
  console.info(message);
}
