export function clearCurrentUserId() {
  return {
    type: 'CURRENT_USER_ID_CLEAR'
  };
}

export function setCurrentUserId(api, store, dispatchAction, id) {
  return {
    type: 'CURRENT_USER_ID_SET',
    payload: id
  };
}
