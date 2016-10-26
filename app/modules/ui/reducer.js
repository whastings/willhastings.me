import { always } from '@whastings/js_utils';
import { createReducer, mergeWithState } from 'app/utils/reducerUtils';

export default createReducer(
  {
    LOADER_HIDE: mergeWithState(always('isLoading'), always(false)),
    LOADER_SHOW: mergeWithState(always('isLoading'), always(true))
  },
  {
    isLoading: false
  }
);
