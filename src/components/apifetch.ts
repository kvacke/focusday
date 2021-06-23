import { Options } from '../interface/api';

const RETRIES = 2;

const ApiFetch = (apiOptions: Options, tryCount: number = 0): Promise<object> => {
  const defaultOptions: Options = {
    url: '',
    headers: {},
    method: 'GET',
    body: null,
  };

  let options = Object.assign(defaultOptions, apiOptions);

  if (options.headers) {
    options.headers['Content-Type'] = 'application/json';
  }

  let fetchOptions: RequestInit = {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body),
  };

  if (!options.body) {
    const newHeaders = { 'Content-Type': 'text/plain' };
    fetchOptions.headers = newHeaders;
    delete fetchOptions.body;
  }

  return fetch(`${options.url}`, fetchOptions)
    .then((response) => {
      if (!response.ok && response.status === 401) {
        if (tryCount < RETRIES) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(ApiFetch(options, tryCount + 1));
            }, 600 * (tryCount + 1));
          });
        }
      }
      if (!response.ok) {
        return response.json();
      }
      if (response.status === 204) {
        return {};
      }
      return response.json();
    })
    .then((response: { error?: string }) => {
      if (response.error) {
        throw response;
      }
      return response;
    })
    .catch((e) => {
      throw e;
    });
};

export default ApiFetch;
