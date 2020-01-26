import 'whatwg-fetch';

export function fetchData(action, query, model) {
  let apiPath = '/__/data/' + action;
  const payload = { query, model };
  return fetch(apiPath, {
    method: 'POST',
    body: JSON.stringify(payload),
    // headers: {}
  })
  .then(response => response.json())
  .then(json => {
    if (json.state) {
      return json.model;
    }
    console.error('queryKit', json.error);
    console.warn(json.stack);
    throw new Error('server error')
  });
}