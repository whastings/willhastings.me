// @flow

import { deleteResource, postJSON } from 'app/utils/request';
import type { Session } from 'users/types';

export default {
  createSession(username: string, password: string): Promise<Session> {
    return postJSON('/api/session', {user: {username, password}});
  },

  destroySession(): Promise<Response> {
    return deleteResource('/api/session');
  }
};
