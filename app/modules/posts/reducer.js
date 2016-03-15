import { identity, prop } from '@whastings/js_utils';
import { createReducer, mergeAllWithState, mergeWithState } from 'app/utils/reducerUtils';

const getId = prop('id');

export default createReducer({
  POST_ADD: mergeWithState(getId, identity),

  POSTS_ADD: mergeAllWithState(getId, identity),

  POST_REMOVE: function(state, action) {
    let id = action.payload;
    return state.without(id.toString());
  },

  POST_UPDATE: mergeWithState(getId, identity)
});
