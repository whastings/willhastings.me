import { always, identity } from '@whastings/js_utils';
import { createReducer, mergeWithState } from 'app/utils/reducerUtils';

export default createReducer({
  CURRENT_USER_ID_CLEAR: mergeWithState(always('currentUserId'), always(null)),

  CURRENT_USER_ID_SET: mergeWithState(always('currentUserId'), identity)
});
