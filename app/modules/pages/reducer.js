import { identity, prop } from '@whastings/js_utils';
import { createReducer, mergeWithState } from 'app/utils/reducerUtils';

export default createReducer({
  PAGE_ADD: mergeWithState(prop('id'), identity)
});
