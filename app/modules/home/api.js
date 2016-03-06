import { getJSON } from 'app/utils/request';

export default {
  getHomePage() {
    return getJSON('/api/pages/home');
  }
};
