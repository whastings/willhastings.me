export function get(route) {
  return fetch(`/api/${route}`)
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}

export function post(route, body = null) {
  body = body ? JSON.stringify(body) : undefined;

  return fetch(`/api/${route}`, {
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
    .then((response) => {
      // TODO: Check response.ok
      return response.json();
    });
}
