import { identity, prop } from '@whastings/js_utils';
import { createReducer, mergeWithState } from 'app/utils/reducerUtils';

export default createReducer({
  USER_ADD: mergeWithState(prop('id'), identity)
});
