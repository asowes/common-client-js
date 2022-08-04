export default function fetchRequest(url, method, data, headers) {
  const initOptions = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method,
  };
  const options = data
    ? { ...initOptions, body: JSON.stringify(data) }
    : initOptions;
  return fetch(url, options)
    .then((r) => r.json())
    .catch((e) => e);
}
