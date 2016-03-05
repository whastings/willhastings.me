import { deleteResource, postJSON } from 'app/utils/request';

export default {
  createSession(username, password) {
    return postJSON('/api/session', {user: {username, password}});
  },

  destroySession() {
    return deleteResource('/api/session');
  }
};
