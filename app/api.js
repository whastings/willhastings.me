import { getJSON } from 'app/utils/request';
import { postJSON } from 'app/utils/request';

export default {
  createSession(username, password) {
    return postJSON('/api/sessions', {user: {username, password}});
  },

  getPage(page) {
    return getJSON(`/api/pages/${page}`);
  }
};
