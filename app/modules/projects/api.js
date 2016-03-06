import { getJSON } from 'app/utils/request';

export default {
  getProjectsPage() {
    return getJSON('/api/pages/projects');
  }
};
